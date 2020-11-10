import React, { useContext } from 'react'
import BaseDataStore from '../../../models/base.model'
import { PEOPLE } from '../../../models/collections'
import { avatars } from '../constants/avatars'
import Global from './../../common/context';
import { firestore } from 'firebase';

const PeopleHooks = () => {
    const { currentUser: { uid } } = useContext(Global.AuthContext);

    const onFetchPeople = async () => {
        return await BaseDataStore.GET(uid, PEOPLE);
    }

    const onFindOnePeople = async id => {
        return await BaseDataStore.GET(uid, PEOPLE, id);
    }

    const onCreatePerson = async data => {
        return await BaseDataStore.CREATE(uid, PEOPLE, data);
    }

    const onUpdatePerson = async (data, id) => {
        return await BaseDataStore.UPDATE(uid, PEOPLE, {
            ...data,
            updatedAt: firestore.Timestamp.fromDate(new Date())
        }, id);
    }

    const onLoadAvatar = (avatar, large = false) => {
        const index = avatars.findIndex(a => a.name === avatar);
        if (index !== -1) {
            return avatars[index].avatar;
        }
    }

    return {
        onFetchPeople,
        onLoadAvatar,
        onFindOnePeople,
        onCreatePerson,
        onUpdatePerson
    }
}

export default PeopleHooks
