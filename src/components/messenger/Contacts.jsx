import React from "react";
import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";

const Contacts = () => {
  const conversations = useSelector((state) => state.messenger.conversations);

  return (
    <section className="contactsListContainer">
      <div className="contactList">
        {conversations.map((conv) => (
          <ContactCard key={conv._id} conversation={conv} />
        ))}
      </div>
    </section>
  );
};

export default Contacts;
