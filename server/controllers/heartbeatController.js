import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import ShoppingList from "../models/ShoppingList.js";

// !Important: Add Model names of new features into featureModel object, featureName function and into heartbeatSchema

const featureModels = {
  ShoppingList,
};

const featureName = (featureType) => {
  switch (featureType) {
    case "ShoppingList":
      return "Einkaufsliste";
    default:
      return "Unbekanntes Feature";
  }
};

export const getLockStatus = asyncHandler(async (req, res, next) => {
  const { featureID } = req.params;
  const { featureType } = req.body;

  const Model = featureModels[featureType]; // Stellen Sie sicher, dass featureModels die verschiedenen Modelle korrekt abbildet.
  if (!Model) {
    throw new ErrorResponse({
      message: "Feature existiert nicht!",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "FEATURE_NOTFOUND_001",
    });
  }

  const feature = await Model.findById(featureID);
  if (!feature) {
    throw new ErrorResponse({
      message: "Das angeforderte Feature wurde nicht gefunden.",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "FEATURE_NOTFOUND_002",
    });
  }

  // Überprüfen Sie den Lock-Status des Features
  if (feature.isLocked) {
    // Wenn gesperrt, senden Sie Informationen über den Benutzer, der es gesperrt hat.
    res.status(200).json({
      isLocked: true,
      lockedBy: feature.lockedBy.username,
      message: `Das Feature ist derzeit von ${feature.lockedBy.username} gesperrt.`,
    });
  } else {
    // Wenn nicht gesperrt, senden Sie eine entsprechende Antwort.
    res.status(200).json({
      isLocked: false,
      message: "Das Feature ist derzeit nicht gesperrt.",
    });
  }
});

export const sendHeartbeat = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { featureID } = req.params;
  const { featureType } = req.body;

  const Model = featureModels[featureType];
  if (!Model) {
    throw new ErrorResponse({
      message: "Feature existiert nicht!",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "HEARTBEAT_NOTFOUND_002",
    });
  }

  const feature = await Model.findById(featureID);
  if (!feature.isLocked) {
    throw new ErrorResponse({
      message: `Die ${featureName(featureType)} ist nicht mehr gesperrt`,
      statusCode: 403,
      errorType: "ConflictError",
      errorCode: "HEARTBEAT_CONFLICT_003",
    });
  }
  if (feature.isLocked && feature.lockedBy.userID !== userID) {
    throw new ErrorResponse({
      message: `Die ${featureName(featureType)} ist bereits von ${feature.lockedBy.username} gesperrt.`,
      statusCode: 403,
      errorType: "ConflictError",
      errorCode: "HEARTBEAT_CONFLICT_002",
    });
  }

  feature.lockExpiresAt = new Date(new Date().getTime() + 2 * 60000);
  await feature.save();

  res.status(200).json({
    message: `Sperre der ${featureName(featureType)} wurde erfolgreich aktualisiert.`,
  });
});

export const lockFeatureEdit = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { featureID } = req.params;
  const { featureType, username } = req.body;

  const Model = featureModels[featureType];
  if (!Model) {
    throw new ErrorResponse({
      message: "Feature existiert nicht!",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "HEARTBEAT_NOTFOUND_002",
    });
  }

  const feature = await Model.findById(featureID);
  if (!feature) {
    throw new ErrorResponse({
      message: `${featureName(featureType)} existiert nicht.`,
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "HEARTBEAT_NOTFOUND_001",
    });
  }

  const now = new Date();
  if (
    feature.isLocked &&
    feature.lockExpiresAt > now &&
    feature.lockedBy.userID !== userID
  ) {
    throw new ErrorResponse({
      message: `Das Feature wird derzeit von ${feature.lockedBy.username} bearbeitet.`,
      statusCode: 403,
      errorType: "ConflictError",
      errorCode: "HEARTBEAT_CONFLICT_001",
    });
  }

  feature.isLocked = true;
  feature.lockedBy = { userID, username };
  feature.lockExpiresAt = new Date(now.getTime() + 2 * 60000);
  await feature.save();

  res.status(200).json({
    message: `${featureName(featureType)} wurde erfolgreich gesperrt.`,
  });
});

export const unlockFeatureEdit = asyncHandler(async (req, res, next) => {
  const { userID } = req;
  const { featureID } = req.params;
  const { featureType } = req.body;

  const Model = featureModels[featureType];
  if (!Model) {
    throw new ErrorResponse({
      message: "Feature existiert nicht!",
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "HEARTBEAT_NOTFOUND_002",
    });
  }

  const feature = await Model.findById(featureID);
  if (!feature) {
    throw new ErrorResponse({
      message: `${featureName(featureType)} existiert nicht.`,
      statusCode: 404,
      errorType: "Not Found",
      errorCode: "HEARTBEAT_NOTFOUND_001",
    });
  }
  if (feature.isLocked && feature.lockedBy.userID !== userID) {
    throw new ErrorResponse({
      message: `Das Feature wird derzeit von ${feature.lockedBy.username} bearbeitet.`,
      statusCode: 403,
      errorType: "ConflictError",
      errorCode: "HEARTBEAT_CONFLICT_001",
    });
  }

  feature.isLocked = false;
  feature.lockedBy = null;
  feature.lockExpiresAt = null;
  await feature.save();

  res.status(200).json({
    message: `${featureName(featureType)} wurde erfolgreich entsperrt.`,
  });
});

const checkLocks = asyncHandler(async () => {
  const now = new Date();

  for (let key in featureModels) {
    const Model = featureModels[key];
    const expiredFeatures = await Model.find({
      isLocked: true,
      lockExpiresAt: { $lt: now },
    });

    expiredFeatures.forEach(async (feature) => {
      feature.isLocked = false;
      feature.lockedBy = null;
      feature.lockExpiresAt = null;
      await feature.save();
      console.log(
        `Feature ${feature.id} von Typ ${key} wurde automatisch entsperrt.`,
      );
    });
  }
});

setInterval(() => {
  checkLocks().catch((err) => {
    console.error("Fehler bei der Überprüfung der Locks: ", err);
  });
}, 600000);

checkLocks();
