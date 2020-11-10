import { DB, AUTH } from '../core/firebase.config';
import { USERS } from './collections';

const BaseDataStore = {
    CUSTOM_GET: async (ref, id = null) => {
        if (!id) {
            const items = []
            const snapshot = await ref.get();
            snapshot.forEach(doc => {
                items.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            return items;
        } else {
            const snapshot = await ref.doc(id).get();
            return {
                id: snapshot.id,
                ...snapshot.data()
            }
        }
    },
    CUSTOM_SUBSCRIPTION: async (ref, func) => {
        return ref.onSnapshot(func);
    },
    GET: async (userId, collection, id = null) => {
        if (!id) {
            const items = []
            const snapshot = await DB.collection(USERS).doc(userId).collection(collection).get()
            snapshot.forEach(doc => {
                items.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            return items;
        } else {
            const snapshot = await DB.collection(USERS).doc(userId).collection(collection).doc(id).get();
            return {
                id: snapshot.id,
                ...snapshot.data()
            }
        }

    },
    SUBSCRIPTION: async (userId, collection, func) => {
        const snapshot = await DB.collection(USERS).doc(userId).collection(collection);
        return snapshot.onSnapshot(func);
    },
    CREATE: async (userId, collection, data) => {
        const snapshot = DB.collection(USERS).doc(userId).collection(collection)
        return await snapshot.add(data)
    },
    UPDATE: async (userId, collection, data, id) => {
        const snapshot = DB.collection(USERS).doc(userId).collection(collection);
        return await snapshot.doc(id).update(data);
    },


    // GET: async (collection, id = null) => {
    //     if (!id) {
    //         const items = []
    //         const snapshot = await DB.collection(collection).get();
    //         snapshot.forEach(doc => {
    //             items.push({
    //                 id: doc.id,
    //                 ...doc.data()
    //             })
    //         })

    //         return items;
    //     } else {
    //         const snapshot = await DB.collection(collection).doc(id).get();
    //         return {
    //             id: snapshot.id,
    //             ...snapshot.data()
    //         }
    //     }

    // },
    // SUBSCRIPTION: async (collection, func) => {
    //     const snapshot = DB.collection(collection);
    //     return snapshot.onSnapshot(func);
    // },
    // CREATE: async (collection, data) => {
    //     const snapshot = DB.collection(collection)
    //     return await snapshot.add(data)
    // },
    // UPDATE: async (collection, data, id) => {
    //     const snapshot = DB.collection(collection);
    //     return await snapshot.doc(id).set(data);
    // }
}


export default BaseDataStore;
