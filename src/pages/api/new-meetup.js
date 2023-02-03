import {MongoClient} from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
        const db = client.db();
        const meetupsCollection = db.collection("testMeetups");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({messge: "성공적으로 삽입됨"});
    }
}

export default handler;