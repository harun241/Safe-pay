import mongoose from "mongoose";

const fraudDetactionApiSchema = new mongoose.Schema(
  {
    api:{type:String}
  }
  
);

const FraudDetactionApi = mongoose.models.FraudDetactionApi || mongoose.model("FraudDetactionApi", fraudDetactionApiSchema);
export default FraudDetactionApi;
