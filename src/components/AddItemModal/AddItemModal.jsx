import { useEffect, useState } from "react";
import "./AddItemModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ handleCloseClick, isOpen }) {
  return (
    <ModalWithForm
      buttonText="Add garment"
      formTitle="New garment"
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
    >
      <label htmlFor="Name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="Name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="ImageURL" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="ImageURL"
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select weather type:</legend>
        <label htmlFor="Hot" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Hot"
            name="weather type"
          />
          Hot
        </label>
        <label htmlFor="Warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Warm"
            name="weather type"
          />
          Warm
        </label>
        <label htmlFor="Cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="Cold"
            name="weather type"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
