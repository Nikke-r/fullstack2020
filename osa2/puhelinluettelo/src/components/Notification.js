import React from 'react';

const Notification = ({ message }) => {

    if (message === null) {
        return null
    }

    if (message.error) {
        return (
            <div className='error'>
                {message.error}
            </div>
        )
    }

    if (message.success) {
        return (
            <div className='success'>
                {message.success}
            </div>
        )
    }
}

export default Notification;
