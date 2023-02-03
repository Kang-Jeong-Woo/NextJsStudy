import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name={"description"} content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title} address={props.meetupData.address} desciption={props.meetupData.description} />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db();

    const meetupsCollection = db.collection("testMeetups");

    const meetupsAry = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();
    return {
        fallback: false,
        paths: meetupsAry.map(meetupAry => ({ params: { meetupId: meetupAry._id.toString() } }))
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db();
    const meetupsCollection = db.collection("testMeetups");
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId.valueOf(meetupId) });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}
export default MeetupDetails;