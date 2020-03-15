import React from 'react';

const Persons = (props) => {
    return (
      <div>
      {props.showContacts.map((contact, i) => {
        return (
          <p key={i}> {contact.name} </p>
        )
      })}
      </div>
    )
};

export default Persons;
