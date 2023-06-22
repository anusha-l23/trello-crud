import "../styles/Card.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "./CardEditor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
  //import { faCoffee } from '@fortawesome/free-light-svg-icons'

class Card extends Component {
  state = {
    editing: false,
  };


  startEditing = () =>

    this.setState({
      
      editing: true,
      text: this.props.card.text
      
    });


  endEditing = () => this.setState({ editing: false });

  editCard = async text => {
    const { card, dispatch } = this.props;

    this.endEditing();
console.log(card, text);
    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card?._id, cardText: text }

    });
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;
    console.log(listId, "listId")
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId }
      });
  };

  render() {
    
    const { card, index, cardId } = this.props;
    console.log(card, "card data")

   
    const { editing } = this.state;

    if (!editing && card) {
      return (
        <Draggable draggableId={card?._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="Card"
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
            >
                <div className="Card-Icons">
                  <div className="Card-Icon" onClick={this.startEditing}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="20" strokeDashoffset="20" d="M3 21H21"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="20;0"></animate></path><path strokeDasharray="44" strokeDashoffset="44" d="M7 17V13L17 3L21 7L11 17H7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.6s" values="44;0"></animate></path><path strokeDasharray="8" strokeDashoffset="8" d="M14 6L18 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="8;0"></animate></path></g></svg>                  </div>
                </div>
{card?.text}
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <CardEditor
          text={card?.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
