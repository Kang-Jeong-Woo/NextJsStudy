import MeetupList from "@/components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import Head from "next/head";

function HomePage(props){
    return(
        <>
            <Head>
                <title>React Meetups</title>
                <meta name={"페이지 이름"} content={"SE이 내보낼 간단한 설명"}/>
            </Head>
            <MeetupList meetups={props.meetups}></MeetupList>
        </>
    )
}

// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//
//     // fetch data from an API first then
//     return{
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     };
// }
export async function getStaticProps() {
    const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db();

    const meetupsCollection = db.collection("testMeetups");

    const meetupsAry = await meetupsCollection.find().toArray();

    client.close();

    return {
        props:{
            meetups: meetupsAry.map(meetup=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()
            })),
        },
        revalidate:3
    };
}

export default HomePage;

