import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch {
    console.log(
      `Erreur  à la connection de la basse de donnée : ${error.message}`
    );
    process.exit(1); // process code 1 means exit with faillure , means sucess
  }
};
