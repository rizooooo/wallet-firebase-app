import React, { useState } from 'react'
import { Row, Col, Label } from 'reactstrap'
import { avatars } from '../constants/avatars'

export const AvatarTypes = {
    ON_SELECT_AVATAR: 'ON_SELECT_AVATAR'
}

const AvatarPicker = ({ handler }) => {
    const [selectedAvatar, setAvatar] = useState(null);

    const onSelectAvatar = avatar => {
        setAvatar(avatar);
        handler({ action: AvatarTypes.ON_SELECT_AVATAR, data: avatar });
    }

    return (
        <Row form>
            <Col>
                <Label>Select Avatar</Label>
                <Row style={{ flexWrap: 'nowrap', overflowX: 'scroll' }}>
                    {avatars.map(a => (
                        <Col className='clickable' key={a.name} onClick={() => onSelectAvatar(a)}>
                            <img key={a.name} className={selectedAvatar === a ? 'active-avatar' : undefined} src={a.avatar} height={50} />
                        </Col>

                    ))}
                </Row>
            </Col>
        </Row>
    )
}

export default AvatarPicker
