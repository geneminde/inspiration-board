import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ['', ...emoji.names]

const NewCardForm = (props) => {
  const [formFields, setFormFields] = useState({
    text: '',
    emoji: '',
  });
  const [cardEmoji, setCardEmoji] = useState('')

  const isEnabled = formFields.text || formFields.emoji

  const onInputChange = (event) => {
    const newFormFields = {
      ...formFields,
    }
    newFormFields[event.target.name] = event.target.value;
    setFormFields(newFormFields)
  };
  const onSelect = selectedOption => {
    setCardEmoji(selectedOption)

    
    const newFormFields = {
      ...formFields,
    }
    newFormFields["emoji"] = cardEmoji["value"]
    setFormFields(newFormFields)
  }
  useEffect(() => {
    const newFormFields = {...formFields}
    newFormFields["emoji"] = cardEmoji.value
    setFormFields(newFormFields)
  }, [cardEmoji]);

  const buildOptions = (name) => {
    if (name) {
      const unicode = emoji.getUnicode(name)
      return {value: name, label: unicode}
    } else {
      return {value: name, label: name}
    }
  }
  const emojiOptions = EMOJI_LIST.map(emojiName => buildOptions(emojiName))

  const onCardSubmit = (event) => {
    event.preventDefault();

    props.onSubmitCallback(formFields)

    setFormFields({
      text: '',
      emoji: '',
    });
    
    setCardEmoji({label: '', value: ''})
  };

  return(
    <form 
      className="new-card-form"
      onSubmit={onCardSubmit}
      >
        <h2 className="new-card-form__header">Add a new card </h2>
        <div>
          <label className="new-card-form__form-label" name="text">Message: </label>
          <input name="text" onChange={onInputChange} value={formFields.text} className="new-card-form__form-textarea" />
        </div>
        <div>
          <label className="new-card-form__form-label" >Emoji: </label>
          <Select className="new-card-form__form-select" options={emojiOptions} placeholder="Select or search..." name="emoji" value={cardEmoji} onChange={onSelect} />
        </div>
        <input 
          className="new-card-form__form-button"
          type="submit"
          value="Add Card"
          disabled={!isEnabled}/>
      </form>
  );
};

NewCardForm.propTypes = {
  onSubmitCallback: PropTypes.func.isRequired
}

export default NewCardForm