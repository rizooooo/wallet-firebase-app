import React, { useContext } from 'react'
import BaseDataStore from '../../../models/base.model'
import { PEOPLE, USERS, TRANSACTIONS } from '../../../models/collections'
import { avatars } from '../constants/avatars'
import Global from './../../common/context';
import { DB } from '../../../core/firebase.config';
import { firestore } from 'firebase';

const TransactionHooks = () => {
    const { currentUser: { uid } } = useContext(Global.AuthContext);

    const onCreateTransaction = async (personId, data) => {
        const ref = DB.collection(USERS).doc(uid).collection(PEOPLE).doc(personId).collection(TRANSACTIONS)
        return await ref.add({
            ...data,
            amount: Number(data.amount),
            paid: false,
            created: firestore.Timestamp.fromDate(new Date())
        });
    }

    const onFetchTransactions = async personId => {
        const ref = DB.collection(USERS).doc(uid).collection(PEOPLE).doc(personId).collection(TRANSACTIONS).orderBy('created', 'desc')
        return await BaseDataStore.CUSTOM_GET(ref);
    }

    const onSubscriptionTransactions = async (personId, func) => {
        const ref = DB.collection(USERS).doc(uid).collection(PEOPLE).doc(personId).collection(TRANSACTIONS)
        return await BaseDataStore.CUSTOM_SUBSCRIPTION(ref, func)
    }

    const onToggleTransaction = async (personId, { id, paid }) => {
        const ref = DB.collection(USERS).doc(uid).collection(PEOPLE).doc(personId).collection(TRANSACTIONS).doc(id);
        return await ref.update({
            paid: paid ? false : true,
            paidDate: paid ? null : firestore.Timestamp.fromDate(new Date())
        })
    }

    const onUpdatePersonAttributes = async (personId, amount) => {
        const ref = DB.collection(USERS).doc(uid).collection(PEOPLE).doc(personId)
        return ref.update({ lastModified: firestore.Timestamp.fromDate(new Date()), amount })
    }

    return {
        onCreateTransaction,
        onFetchTransactions,
        onSubscriptionTransactions,
        onToggleTransaction,
        onUpdatePersonAttributes
    }
}

export default TransactionHooks
