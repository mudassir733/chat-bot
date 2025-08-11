import dotenv from "dotenv";
import postgres from "postgres";
dotenv.config();

const sql = postgres(`${process.env.DB_URI}`, {
    ssl: 'require'
});

export const connectToDb = async () => {
    try {
        const result = await sql`SELECT NOW()`;
        console.log('Connected to NeonDB! Server time:', result[0]);
    } catch (error: any) {
        console.error('Error connecting to NeonDB:', error.message);

    }

}




