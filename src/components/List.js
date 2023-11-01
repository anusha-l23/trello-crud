import "../styles/List.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
//import { getAllCards } from "../api/cards";
import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import {toast} from "react-toastify";
class List extends Component {
  state = {
    editingTitle: false,
    title: this.props.list.title,
    addingCard: false,
    cards: [],
    card: "",
    toggleMenu: false,
    toggleArrow: false,
    toggleMove: false,
    toggleCard: false,
    toggleCardTemp: false,
    togglePlus: false,
   // color: "white",
    globalColor: 'white'
  };
  dropdownRef = React.createRef();
  handleGlobalColorChange = (newColor) => {
    this.setState({ globalColor: newColor });
    toast.success('Success! All Cards Updated Successfully!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

 componentDidMount () {
  document.addEventListener("mousedown", this.handleClickOutSideList)
 }
 componentWillUnmount() {
  document.removeEventListener("mousedown", this.handleClickOutSideList)
 }

 handleClickOutSideList = (event) =>{
if(this.dropdownRef.current && !this.dropdownRef.current.contains(event.target))
{
  this.setState({toggleMenu: false, toggleArrow: false})
}
 }

  toggleAddingCard = () =>
    this.setState({ addingCard: !this.state.addingCard });

  toggleCardTemp = () =>
    this.setState({ toggleCardTemp: !this.state.toggleCardTemp });

  addCard = async (cardText) => {
    const { listId, dispatch } = this.props;

    this.toggleAddingCard();

    const cardId = shortid.generate();

    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId },
    });
  };

  addCardTemp = async (cardText) => {
    const { listId, dispatch } = this.props;

    this.toggleCardTemp();

    const cardId = shortid.generate();

    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId },
    });
  };

  toggleEditingTitle = () =>
    this.setState({ editingTitle: !this.state.editingTitle });

  handleChangeTitle = (e) => this.setState({ title: e.target.value });

  editListTitle = async () => {
    const { listId, dispatch } = this.props;
    const { title } = this.state;

    this.toggleEditingTitle();

    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title },
    });
    toast.success('Success! Column updated successfully!'
    , {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  deleteList = async () => {
    const { listId, list, dispatch } = this.props;

    dispatch({
      type: "DELETE_LIST",
      payload: { listId, cards: list.cards },
    });
  };

  //   async componentDidMount() {
  //     //const {cards} = this.list.cards;

  // await getAllCards()
  //       .then((res) => {
  // console.log(res.data);
  // this.setState({cards: res.data})

  //       })
  //       .catch((error) => console.log(error));
  //   }

  //   handleAdd = async () => {
  //     //const {cards} = this.list.cards;

  // await addCard(this.card)
  //       .then((res) => {
  //         this.setState({card: this.state.card})
  //       })
  //       .catch((error) => console.log(error));
  //   }

  render() {
    const { list, index } = this.props;

    const {
      editingTitle,
      addingCard,
      title,
      toggleMove,
      toggleMenu,
      toggleCard,
      togglePlus,
    } = this.state;

    console.log(this.state.cards, "state");
    return (
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="List"
          >
             <div className="lists__menu">
                <div className="flex">
            {editingTitle ? (
              <ListEditor
                list={list}
                title={title}
                handleChangeTitle={this.handleChangeTitle}
                saveList={this.editListTitle}
                onClickOutside={this.editListTitle}
                deleteList={this.deleteList}
              />
            ) : (
             
                  <div className="List-Title" onClick={this.toggleEditingTitle}>
                    {list.title}
                  </div>
            )}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      style={{ color: "#414ba4" }}
                      onClick={() =>
                        this.setState({ togglePlus: !this.state.togglePlus })
                      }
                    >
                      <path
                        fill="currentColor"
                        d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                      ></path>
                    </svg>
                    <svg className=""
                      onClick={() =>
                        toggleMove
                          ? this.setState({
                            toggleMove: !this.state.toggleMove,
                          })
                          : this.setState({
                            toggleArrow: !this.state.toggleArrow,
                          })
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      style={{ marginLeft: "0.5em", color: "#414ba4" }}
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m11 16l-3 3m0 0l-3-3m3 3V5m5 3l3-3m0 0l3 3m-3-3v14"
                      ></path>
                    </svg>
                    <button
                      className="lists__menu-btn dots-color"
                      style={{ backgroundColor: "#dfe3e6" }}
                      onClick={() =>
                        toggleMove
                          ? this.setState({
                            toggleMove: !this.state.toggleMove,
                          })
                          : this.setState({
                            toggleMenu: !this.state.toggleMenu,
                          })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2Z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {/* {toggleMenu && (
                    <div className="lists__menu-dropdown">
                      <div className="lists__menu-title">
                        <div className="flex">
                          <p style={{ marginLeft: "4rem" }}>List actions</p>
                          <div
                            tabIndex="0"
                            onClick={() => {
                              this.setState({
                                toggleMenu: !this.state.toggleMenu,
                              });
                            }}
                          >
                            <i className="fa fa-close"></i>
                          </div>
                        </div>
                        <hr></hr>
                      </div>
                      <ul className="lists__menu-dropdown__options">
                        <li onClick={this.toggleAddingCard}>Add card...</li>
                        <li>copy list...</li>
                        <li>Move list...</li>
                        <li>Watch</li>
                      </ul>
                      <hr></hr>
                      <ul className="lists__menu-dropdown__options">
                        <li>Sort by...</li>
                      </ul>
                      <hr></hr>
                      <ul className="lists__menu-dropdown__options">
                        <li>Automation</li>
                        <li>When a card is added to the list</li>
                        <li>Every day, sort list by…</li>
                        <li>Every Monday, sort list by…</li>
                        <li>Create a rule</li>
                      </ul>
                      <hr></hr>
                      <ul className="lists__menu-dropdown__options">
                        <li>Move all cards in this list…</li>
                        <li>Archive all cards in this list…</li>
                      </ul>
                      <hr></hr>
                      <ul className="lists__menu-dropdown__options">
                        <li>Archive this list</li>
                      </ul>
                    </div>
                  )} */}
                  {this.state.toggleArrow && (
                    <div className="lists__menu-dropdown4" ref={this.dropdownRef}>
                      <ul className="ul">
                        <li
                          style={{ marginTop: "1em" }}
                        >
                          <svg style={{ color: "#414ba4" }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15.98 8.17l-.97 5.95C14.84 15.5 13.13 16 12 16H5.69c-.2 0-.38-.05-.53-.14L3.72 15H2c-1.06 0-2-.94-2-2V9c0-1.06.94-2.02 2-2h2c.91 0 1.39-.45 2.39-1.55c.91-1 .88-1.8.63-3.27c-.08-.5.06-1 .42-1.42C7.83.29 8.42 0 9 0c1.83 0 3 3.71 3 5.01l-.02.98h2.04c1.16 0 1.95.8 1.98 1.97c0 .11-.02.21-.02.21zm-1.97-1.19h-1.99c-.7 0-1.03-.28-1.03-.97l.03-1.03c0-1.27-1.17-4-2-4c-.5 0-1.08.5-1 1c.25 1.58.34 2.78-.89 4.14C6.11 7.25 5.36 8 4 8v6l1.67 1H12c.73 0 1.95-.31 2-1l.02-.02l1-6c-.03-.64-.38-1-1-1h-.01z" fill="currentColor"></path></svg> sort by Up Votes</li>
                          <li
                          style={{ marginTop: "1em" }}
                        ><svg style={{ color: "#414ba4" }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15.98 7.83l-.97-5.95C14.84.5 13.13 0 12 0H5.69c-.2 0-.38.05-.53.14L3.72 1H2C.94 1 0 1.94 0 3v4c0 1.06.94 2.02 2 2h2c.91 0 1.39.45 2.39 1.55c.91 1 .88 1.8.63 3.27c-.08.5.06 1 .42 1.42c.39.47.98.76 1.56.76c1.83 0 3-3.71 3-5.01l-.02-.98h2.04c1.16 0 1.95-.8 1.98-1.97c0-.11-.02-.21-.02-.21zm-1.97 1.19h-1.99c-.7 0-1.03.28-1.03.97l.03 1.03c0 1.27-1.17 4-2 4c-.5 0-1.08-.5-1-1c.25-1.58.34-2.78-.89-4.14C6.11 8.75 5.36 8 4 8V2l1.67-1H12c.73 0 1.95.31 2 1l.02.02l1 6c-.03.64-.38 1-1 1h-.01z" fill="currentColor"></path></svg> sort by Down Votes</li>
                         <li
                          style={{ marginTop: "1em" }}
                        >
                      <svg style={{ color: "#414ba4" }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V3q0-.425.288-.713T7 2q.425 0 .713.288T8 3v1h8V3q0-.425.288-.713T17 2q.425 0 .713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm0 0V6v2Zm7 6q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm-4 0q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm8 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14Zm-4 4q-.425 0-.713-.288T11 17q0-.425.288-.713T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18Zm-4 0q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18Zm8 0q-.425 0-.713-.288T15 17q0-.425.288-.713T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18Z"></path></svg> sort by Created Date
                      </li>
                      <li
                          style={{ marginTop: "1em" }}
                        >
                      <svg style={{ color: "#414ba4" }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3C6.5 3 2 6.58 2 11a7.218 7.218 0 0 0 2.75 5.5c0 .6-.42 2.17-2.75 4.5c2.37-.11 4.64-1 6.47-2.5c1.14.33 2.34.5 3.53.5c5.5 0 10-3.58 10-8s-4.5-8-10-8m0 14c-4.42 0-8-2.69-8-6s3.58-6 8-6s8 2.69 8 6s-3.58 6-8 6Z"></path></svg> sort by Color
                        </li>
                        </ul>
                        </div>
                  )}
                  {this.state.toggleMenu && (
                    <div className="lists__menu-dropdown3" ref={this.dropdownRef}>
                      <ul className="ul">
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.editListTitle}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            style={{ color: "#414ba4" }}
                          >
                            <path
                              fill="currentColor"
                              d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                            ></path>
                          </svg>{" "}
                          Edit
                        </li>
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.deleteCard}
                        >
                          <i
                            className="fa fa-comment-o"
                            style={{ color: "#414ba4" }}
                          ></i> Convert All to Comments
                        </li>
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.deleteCard}
                        >
                        
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style={{ color: "#414ba4" }}><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z" /></svg> Convert All to Actions
                        </li>
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.deleteList}
                        >
                          <svg
                            style={{ color: "#414ba4", fontWeight: "bold" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"
                            ></path>
                          </svg>{" "}
                          Empty Column
                        </li>
                      </ul>
                      <div style={{ marginLeft: "2em", marginBottom: "1em" }}>
                        <hr style={{ marginTop: "1em", marginBottom: "1em" }} />
                        <span
                          style={{
                            backgroundColor: "#e8f0fd",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                          }}
                          onClick={() => this.handleGlobalColorChange('#e8f0fd')}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f2f2fe",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                      //    onClick={() => this.setState({ color: "#f2f2fe" })}
                      onClick={() => this.handleGlobalColorChange('#f2f2fe')}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f1f9e6",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}

                        //  onClick={() => this.setState({ color: "#f1f9e6" })}
                        onClick={() => this.handleGlobalColorChange('#f1f9e6')}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#fcf1e3",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                         // onClick={() => this.setState({ color: "#fcf1e3" })}
                          onClick={() => this.handleGlobalColorChange('#fcf1e3')}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#fdf3f1",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                         // onClick={() => this.setState({ color: "#fdf3f1" })}
                         onClick={() => this.handleGlobalColorChange('#fdf3f1')}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f8e9e6",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                         // onClick={() => this.setState({ color: "#f8e9e6" })}
                         onClick={() => this.handleGlobalColorChange('#f8e9e6')}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#dedef1",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                        //  onClick={() => this.setState({ color: "#dedef1" })}
                        onClick={() => this.handleGlobalColorChange('#dedef1')}
                        ></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            

            <Droppable droppableId={list._id} index={index}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef} className="Lists-Cards">
                  {!togglePlus && (
                    <CardEditor
                      onSave={this.addCard}
                      onCancel={this.toggleAddingCard}
                      adding
                    />
                  )}
                {provided.placeholder}
                  {list.cards &&
                    list.cards.map((cardId, index) => (
                   
                      <Card
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        listId={list._id}
                        globalBackgroundColor={this.state.globalColor}
                      />
             
                    ))}

              

                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps)(List);
