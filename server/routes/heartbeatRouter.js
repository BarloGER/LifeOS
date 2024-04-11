import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateJoi } from "../middlewares/validateJoi.js";
import {
  getLockStatusSchema,
  sendHeartbeatSchema,
  lockFeatureEditSchema,
  unlockFeatureEditSchema,
} from "../joi/heartbeatSchemas.js";
import {
  getLockStatus,
  sendHeartbeat,
  unlockFeatureEdit,
  lockFeatureEdit,
} from "../controllers/heartbeatController.js";

export const heartbeatRouter = Router();

heartbeatRouter.post(
  "/heartbeat/:featureID",
  verifyToken,
  validateJoi(getLockStatusSchema),
  getLockStatus,
);
heartbeatRouter.put(
  "/heartbeat/:featureID",
  verifyToken,
  validateJoi(sendHeartbeatSchema),
  sendHeartbeat,
);

heartbeatRouter.post(
  "/heartbeat/lock/:featureID",
  verifyToken,
  validateJoi(lockFeatureEditSchema),
  lockFeatureEdit,
);

heartbeatRouter.post(
  "/heartbeat/unlock/:featureID",
  verifyToken,
  validateJoi(unlockFeatureEditSchema),
  unlockFeatureEdit,
);
