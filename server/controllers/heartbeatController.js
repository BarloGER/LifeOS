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
