import { uuidv4 } from "../utils/uuid";
import { initializeApp } from "firebase/app";
import { getDatabase, get, query, set, push, remove,  ref, limitToFirst, limitToLast, orderByChild, equalTo } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3ej7OSh4z1YOGPpoZtBFFiR9ujg8h0yY",
  authDomain: "my-project-bf5a3.firebaseapp.com",
  projectId: "my-project-bf5a3",
  storageBucket: "my-project-bf5a3.appspot.com",
  messagingSenderId: "899392801921",
  appId: "1:899392801921:web:331577756d2829df57d180",
  databaseURL: "https://my-project-bf5a3-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

async function firebaseQueryFull(path) {
    return get(ref(database, path)).then(snapshot=>snapshot.val());
}

async function firebaseQueryWithConstraint(path, noOfUpdates, queryConstraint) {
    let newQuery = query(ref(database, path), queryConstraint(noOfUpdates));
    return get(newQuery).then((snapshot)=>snapshot.val());
}

async function firebasePushFull(path, object) {
    return push(ref(database, path), object);
}

async function firebaseSetFull(path, object) {
    return set(ref(database, path), object);
}

async function firebaseRemoveFull(path) {
    return remove(ref(database, path));
}

//async function firebaseIncrement(path) {
//    return set(ref(database, path), increment(1));
//}

async function addIdea([description, epoch]) {
//async function firebaseAddIdea([uuid, description, epoch]) {
    const uuid = (crypto.randomUUID ?
        crypto.randomUUID() :
        uuidv4()); //TODO uuidv4 uses non-ideal Math.random()

    firebasePushFull("/ideas", {
        description: description,
        uuid: uuid,
        epoch: epoch
    });

    // easier querying in the future
    firebaseSetFull(`/pushes/${uuid}`, {
        epoch: epoch
    });

    return uuid;
}

// TODO inconsistent function interface
async function addOpinion([uuid, approve, epoch]) {
    firebasePushFull(`/opinions/${uuid}`, {
        approve: approve,
        epoch: epoch
    });
    // epoch database for opinions
    // can be built separately in the future

    return uuid;
}

async function getIdeasPaginated(start, noOfUpdates, callback) {
    const ideasCount = Object.keys(firebaseQueryFull("/pushes")).length();
    let data;
    if (start > ideasCount/2) {
        data =  firebaseQueryWithConstraint(
            "/ideas", 
            ideasCount - start,
            limitToLast
        );
        data = data.splice(0, noOfUpdates);
    }
    else {
        data = firebaseQueryWithConstraint(
            "/ideas", 
            start+noOfUpdates,
            limitToFirst
        );
        data = data.splice(start, noOfUpdates)
    }

    callback(data);
}

async function getIdeasAll(callback) {
    const data = await firebaseQueryFull("/ideas");
    callback(data);
}

//async function firebaseFindUUID(path, uuid) {
//    let newQuery = query(ref(database, "/ideas"), orderByChild("uuid"));
//    newQuery = query(query, equalTo(uuid));
//    console.log(newQuery);
//
//    console.log(get(newQuery).then((snapshot)=>snapshot.val()));
//    return get(newQuery);
//}

//async function deleteIdea([uuid]) {
//    firebaseRemoveFull(firebaseFindUUID("/ideas", uuid));
//    firebaseRemoveFull(firebaseFindUUID("/updates", uuid));
//    firebaseRemoveFull(`/opinions/${uuid}`);
//}

async function getRecallIdea(callback) {

}

async function searchIdeas(query, callback) {
    //minhash code here
}

export { getIdeasAll, getIdeasPaginated, addIdea, addOpinion, searchIdeas } ;
