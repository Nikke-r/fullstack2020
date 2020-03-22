import React from 'react';

const Persons = ({ showContacts, remove }) => {

    return (
      <div>
      {showContacts.map((contact, i) => {
        return (
          <p key={i}> {contact.name} {contact.number} <button onClick={() => remove(contact.id)}>delete</button> </p>
        )
      })}
      </div>
    )
};

export default Persons;
