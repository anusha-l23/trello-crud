import "../styles/CardEditor.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import React, { Component } from "react";
import EditButtons from "./EditButtons";
import giphy from "../assets/giphy.gif";
import Picker from "emoji-picker-react";
import axios from "axios";
class CardEditor extends Component {
  state = {
    text: this.props.text || "",
    isHover1: false,
    isHover2: false,
    isHover3: false,
    isHover4: false,
    isHover5: false,
    openModal: false,
    userInput: "",
    list: [],
    action: false,
    profile: false,
    name: false,
    gif: false,
    randomGif:"",
    kudos: false,
    openModalPoll: false,
    openModalDraw: false,
    isHover6: false,
    showPicker: false,
  };
onEmojiClick = (emojiObject, event) => {
  this.setState({text: prev => prev + emojiObject.emoji});
  this.setState({showPicker: false})
} 
  toggleKudos = () => {
    this.setState({ kudos: true });
  };
  toggleKudosCancel = () => {
    this.setState({ kudos: false });
  };

  toggleGif = () => {
    this.setState({ gif: true });
  };
  toggleGifCancel = () => {
    this.setState({ gif: false });
  };

  toggleName = () => {
    this.setState({ name: true });
  };

  toggleProfile = () => {
    this.setState({ profile: !this.profile });
  };
  toggleAction = () => {
    this.setState({ action: true });
  };
  toggleActionCancel = () => {
    this.setState({ action: false });
  };


  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  onClickPoll = (e) => {
    e.preventDefault();
    this.setState({ openModalPoll: true });
  };

  onClosePoll = () => {
    this.setState({ openModalPoll: false });
  };
  onClickDraw = (e) => {
    e.preventDefault();
    this.setState({ openModalDraw: true });
  };

  onCloseDraw = () => {
    this.setState({ openModalDraw: false });
  };
  handleChangeText = (event) => {
    this.setState({ text: event.target.value})
};
// handleChangeGif = () => {
//   `${this.state.randomGif}`
// };

  onEnter = (e) => {
    const { text } = this.state;

    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.onSave(text);
    }
  };

  handleMouseEnter1 = () => {
    this.setState({ isHover1: true });
  };

  handleMouseLeave1 = () => {
    this.setState({ isHover1: false });
  };
  handleMouseEnter2 = () => {
    this.setState({ isHover2: true });
  };

  handleMouseLeave2 = () => {
    this.setState({ isHover2: false });
  };
  handleMouseEnter3 = () => {
    this.setState({ isHover3: true });
  };

  handleMouseLeave3 = () => {
    this.setState({ isHover3: false });
  };
  handleMouseEnter4 = () => {
    this.setState({ isHover4: true });
  };

  handleMouseLeave4 = () => {
    this.setState({ isHover4: false });
  };
  handleMouseEnter5 = () => {
    this.setState({ isHover5: true });
  };

  handleMouseLeave5 = () => {
    this.setState({ isHover5: false });
  };

handleGif = () => {
  axios
  .get(`https://api.giphy.com/v1/gifs/random?api_key=HNBQ1lw4HS820hCCOn5Z6HB1cap7q18W`)
  .then((response) => {
    this.setState({randomGif: response.data.data.images.fixed_height.url});
  })
  .catch((error) => {
    console.error('Error fetching random GIF:', error);
  });
}



  render() {
    const {
      text,
      isHover1,
      isHover2,
      isHover3,
      isHover4,
      isHover5,
      action,
    } = this.state;
    const {
      onSave,
      onCancel,
      onDelete,
      adding,
      startEditing,
      //card,
      //editCard,
      //gif,
      toggleMove,
    } = this.props;

    return (
      <div className="Edit-Card lists__menu">
        <div className="Card">
          <div className="emoji-container">
      
        <input
            autoFocus
            className="Edit-Card-Textarea"
            placeholder="Please enter to Add Card"
            value={text}
            style={{marginTop:"15px"}}
            onChange={this.handleChangeText}
            onKeyDown={this.onEnter}
          /> 
  
   </div>
          {action && !this.state.name && (
            <svg
              className="rounded-dashed"
              onClick={() =>
                toggleMove
                  ? this.setState({ toggleMove: !this.state.toggleMove })
                  : this.setState({ profile: !this.state.profile })
              }
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"
              ></path>
            </svg>
          )}
          {this.state.name && (
            <div
              className="profilename"
              onClick={() =>
                toggleMove
                  ? this.setState({ toggleMove: !this.state.toggleMove })
                  : this.setState({ profile: !this.state.profile })
              }
            >
              AL
            </div>
          )}

          {this.state.profile && (
            <div className="lists__menu-dropdown2">
              <div className="lists__menu-title1">
                <div className="flex">
                  <p>Assignee</p>
                  <div
                    tabIndex="0"
                    onClick={() => {
                      this.setState({
                        profile: !this.state.profile,
                      });
                    }}
                  >
                    <i className="fa fa-close"></i>
                  </div>
                </div>
              </div>
              <div className="lists__menu-dropdown__options">
                <div className="flex-start1">
                  <input
                    autoFocus
                    className="assignee"
                    placeholder="Search Users"
                    style={{ borderRadius: "8px" }}
                  />
                  <p>or</p>
                  <button
                    type="submit"
                    className="assignee1"
                    style={{ borderRadius: "8px" }}
                    onClick={() => this.setState({ name: !this.name })}
                  >
                    To me
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* {this.state.gif && (
            <>
              <img
                src={giphy}
                width="50%"
                className="center"
                alt=""
              />
              <div className="flex">
                <input
                  type="text"
                  placeHolder="Search GIF ..."
                  className="borderbottom"
                />
                <button className="bluebutton">Shuffle</button>
              </div>
            </>
          )} */}
      {this.state.randomGif && <img src={this.state.randomGif} alt="Random GIF" />}
          {this.state.kudos && (
            <div className="flex-start" style={{ marginTop: "0.5em" }}>
              <svg
                className="rounded-dashed1"
                onClick={() =>
                  toggleMove
                    ? this.setState({ toggleMove: !this.state.toggleMove })
                    : this.setState({ profile: !this.state.profile })
                }
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"
                ></path>
              </svg>
              <select name="kudos" id="kudos" className="select">
                <option value="volvo">Great Job</option>
                <option value="saab">Congratulations</option>
                <option value="mercedes">Totally Awesome</option>
                <option value="audi">Thanku You</option>
                <option value="audi">Well Done</option>
              </select>
            </div>
          )}
          <hr style={{ marginTop: "1em", marginBottom: "2em" }} />
          {adding ? (
            <div className="flex-start">
              <i
                className="fa fa-comment-o"
                style={{ color: "#0000FF" }}
                onClick={(e) => {
                  this.toggleActionCancel();
                  this.toggleGifCancel();
                  this.toggleKudosCancel();
                }}
              ></i>
              <i
                onMouseEnter={this.handleMouseEnter1}
                onMouseLeave={this.handleMouseLeave1}
                className="fa fa-hand-o-up"
                aria-hidden="true"
                style={{ color: isHover1 ? "#0000FF" : "#c4c4ff" }}
                onClick={this.toggleAction}
              ></i>
              <svg
                onMouseEnter={this.handleMouseEnter2}
                onMouseLeave={this.handleMouseLeave2}
                style={{ color: isHover2 ? "#0000FF" : "#c4c4ff" }}
               // onClick={this.toggleGif}
               onClick={this.handleGif}
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3v-4H7m5-4v8m4 0V8h5m-1 4h-4"
                ></path>
              </svg>
              <svg
                onMouseEnter={this.handleMouseEnter3}
                onMouseLeave={this.handleMouseLeave3}
                style={{ color: isHover3 ? "#0000FF" : "#c4c4ff" }}
                onClick={this.toggleKudos}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
              >
                <g fill="currentColor">
                  <path d="M15.371 13.041c.111.037.226.064.342.081c.185.047.373.08.563.1a1.978 1.978 0 0 0 3.846.114c.218-.786.33-1.598.333-2.414a9.441 9.441 0 0 0 1.168-2.1l.013-.03l.107-.26l.137-.346a28.99 28.99 0 0 0 .415-1.146l.027-.08l.01-.032c.068-.2.136-.422.2-.646c.038-.129.074-.26.109-.392a9.501 9.501 0 0 0 .322-1.791v-.03a2 2 0 0 0-1.732-2.052a1.96 1.96 0 0 0-1.134.195a2 2 0 0 0-1.091 1.636v.01a8.502 8.502 0 0 1-.43 1.793c-.1.3-.2.585-.3.84c-.2-.103-.41-.19-.624-.26l-.019-.009a3.592 3.592 0 0 0-2.262 6.818v.001Zm3.786.031a.978.978 0 0 1-1.849.117c.19-.034.377-.082.559-.144a4.434 4.434 0 0 0 1.489-.89c-.05.31-.116.615-.199.917Zm-5.11-4.26a2.586 2.586 0 0 1 3.27-1.64l.03.01c.195.062.383.144.561.244l-.021.049v.012a5.428 5.428 0 0 1-.9 1.429l-.016.016l-.025.029a1.88 1.88 0 0 1-.1.109a2.193 2.193 0 0 0-.1-.038l-.03-.01a.634.634 0 0 0-.8.4a.575.575 0 0 0 .03.48c.06.128.162.231.289.292c.034.008.067.017.1.028c.09.032.184.053.279.061a.8.8 0 0 0 .437-.1c.07-.036.137-.077.2-.124c.168-.132.322-.28.458-.445l.01-.01a6.325 6.325 0 0 0 1.077-1.693a4.624 4.624 0 0 0 .088-.215a.03.03 0 0 0 0-.015l.01-.024a16.897 16.897 0 0 0 .162-.393l.034-.087l.034-.088c.424-1.015.72-2.079.883-3.167a.999.999 0 0 1 .333-.674a.979.979 0 0 1 .707-.246c.215.012.42.096.58.24a1 1 0 0 1 .34.79c-.01.159-.029.327-.055.5c-.08.492-.192.98-.336 1.457l-.042.14a23.581 23.581 0 0 1-.615 1.764l-.033.084a24.263 24.263 0 0 1-.174.429l-.015.036l-.086.208a8.517 8.517 0 0 1-1.414 2.24a3.736 3.736 0 0 1-1.831 1.26a2.68 2.68 0 0 1-1.043.072a2.942 2.942 0 0 1-.422-.084a.905.905 0 0 1-.214-.045a2.593 2.593 0 0 1-1.64-3.281ZM12.06 3.98a.96.96 0 1 1-1.066-1.596a.96.96 0 0 1 1.066 1.596Zm11.908 18.846a.97.97 0 1 1 1.078 1.612a.97.97 0 0 1-1.078-1.612Zm.999-13.914a1.16 1.16 0 1 0 0-2.32a1.16 1.16 0 0 0 0 2.32ZM6.651 8.716a1.16 1.16 0 1 1-1.288-1.929a1.16 1.16 0 0 1 1.288 1.93Z"></path>
                  <path d="M29.396 14.89a1.044 1.044 0 0 1-.799.032a6.646 6.646 0 0 0-6.397.969c2.327.06 4.602.694 6.623 1.849a2.15 2.15 0 0 1-2.086 3.76a9.742 9.742 0 0 0-7.981-.813c.335.643.586 1.327.745 2.035c.057.211.085.43.084.648a1.963 1.963 0 0 1-.48 1.542c-.08.08-.169.15-.265.209a2.4 2.4 0 0 1-1.055.591l-12.738 3.41a2.42 2.42 0 0 1-2.96-2.97l3.41-12.74a2.4 2.4 0 0 1 .6-1.065a1.45 1.45 0 0 1 .2-.255a1.938 1.938 0 0 1 1.495-.482c.243-.006.486.025.72.092a8.05 8.05 0 0 1 1.794.636c.28-1.62.01-3.288-.769-4.736a1.174 1.174 0 0 1 2.07-1.11a9.715 9.715 0 0 1 .824 7.11a21.066 21.066 0 0 1 2.209 1.805a1.15 1.15 0 0 1 1.677 1.573a16.103 16.103 0 0 1 4.522-1.051a1.05 1.05 0 0 1 .004-1.641a8.74 8.74 0 0 1 8.486-1.33a1.048 1.048 0 0 1 .067 1.932Zm-17.888 7.357l-.181-.155l.166.142l.015.012Zm0 0l.132.112a13.258 13.258 0 0 0-.132-.113Zm-7.454 5.908c.24.065.494.065.735.001l.578-.151a11.293 11.293 0 0 1-2.183-2.08l-.131.49a1.419 1.419 0 0 0 1.001 1.74Zm1.596-2.507a10.26 10.26 0 0 0 2.379 1.641l2.798-.749a17.513 17.513 0 0 1-3.03-2.265a19.225 19.225 0 0 1-3.142-3.853l-.794 2.969a10.149 10.149 0 0 0 1.789 2.257Zm3.517-2.835a16.3 16.3 0 0 0 4.53 2.96l2.491-.668a16.71 16.71 0 0 1-6.011-4.073a22.352 22.352 0 0 1-1.664-1.85c-.23-.285-.444-.57-.644-.853a12.932 12.932 0 0 1-1.772-3.307l-.703 2.661a18.654 18.654 0 0 0 3.773 5.13Zm19.534-3.91a1.15 1.15 0 0 0-.356-.288h-.005a13.151 13.151 0 0 0-11.255-.857l-.192.07l.009.01a13.12 13.12 0 0 0-4.94 3.476c.259.227.51.435.759.635c.349.28.7.539 1.1.8a10.151 10.151 0 0 1 4.028-2.82a10.86 10.86 0 0 1 9.375.693a1.15 1.15 0 0 0 1.477-1.72Z"></path>
                </g>
              </svg>

              <svg
                onMouseEnter={this.handleMouseEnter4}
                onMouseLeave={this.handleMouseLeave4}
                style={{ color: isHover4 ? "#0000FF" : "#c4c4ff" }}
                onClick={this.onClickPoll}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 17c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v5c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z"
                ></path>
              </svg>
              <Modal open={this.state.openModalPoll} onClose={this.onClosePoll}>
                <h3 className="text-center">Create new poll</h3>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        width="50%"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="Create your own template"
                      />
                      <p className="text-center">Create your own template</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="pro">pro</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="What's your Happiness index?"
                      />
                      <p className="text-center">
                        What's your Happiness index?
                      </p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="What's your Energy Level?"
                      />
                      <p className="text-center">What's your Energy Level?</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="The Sprint Weather Report"
                      />
                      <p className="text-center">The Sprint Weather Report</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="pro">pro</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt=""
                      />
                      <p className="text-center">Rate your Sprint</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt=""
                      />
                      <p className="text-center">Pick a Picture</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="Rate Your Scrum Master"
                      />
                      <p className="text-center">Rate Your Scrum Master</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="One Word"
                      />
                      <p className="text-center">One Word</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                </div>
              </Modal>
              <svg
                onMouseEnter={this.handleMouseEnter5}
                onMouseLeave={this.handleMouseLeave5}
                style={{ color: isHover5 ? "#0000FF" : "#c4c4ff" }}
                onClick={this.onClickDraw}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 22q-2.05 0-3.875-.788t-3.188-2.15q-1.362-1.362-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175Q6.4 3.575 8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9q1.337 1.212 2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.313.125t-.087.275q0 .3.375.863t.375 1.287q0 1.25-.688 1.85T12 22Zm0-10Zm-5.5 1q.65 0 1.075-.425T8 11.5q0-.65-.425-1.075T6.5 10q-.65 0-1.075.425T5 11.5q0 .65.425 1.075T6.5 13Zm3-4q.65 0 1.075-.425T11 7.5q0-.65-.425-1.075T9.5 6q-.65 0-1.075.425T8 7.5q0 .65.425 1.075T9.5 9Zm5 0q.65 0 1.075-.425T16 7.5q0-.65-.425-1.075T14.5 6q-.65 0-1.075.425T13 7.5q0 .65.425 1.075T14.5 9Zm3 4q.65 0 1.075-.425T19 11.5q0-.65-.425-1.075T17.5 10q-.65 0-1.075.425T16 11.5q0 .65.425 1.075T17.5 13ZM12 20q.225 0 .363-.125t.137-.325q0-.35-.375-.825T11.75 17.3q0-1.05.725-1.675T14.25 15H16q1.65 0 2.825-.963T20 11.05q0-3.025-2.313-5.038T12.2 4Q8.8 4 6.4 6.325T4 12q0 3.325 2.337 5.663T12 20Z"
                ></path>
              </svg>
              <Modal open={this.state.openModalDraw} onClose={this.onCloseDraw}>
                <h3 className="text-center">Draw your feelings</h3>
                <div className="center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    style={{
                      color: "#273081",
                      fontWeight: "bold",
                      marginLeft: "4em",
                    }}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H8.5l-4.21-4.3a1 1 0 0 1 0-1.41l10-10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41L11.5 20m6.5-6.7L11.7 7"
                    ></path>
                  </svg>
                  <svg
                    style={{ color: "#273081" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z"
                    ></path>
                  </svg>
                </div>

                <div class="pallete">
                  <div class="color" style={{ backgroundColor: "gray" }}></div>
                  <div
                    class="color"
                    style={{ backgroundColor: "orange" }}
                  ></div>

                  <div class="color" style={{ backgroundColor: "cyan" }}></div>
                  <div class="color" style={{ backgroundColor: "pink" }}></div>
                  <div class="color" style={{ backgroundColor: "green" }}></div>
                  <div class="color" style={{ backgroundColor: "blue" }}></div>
                  <div class="color" style={{ backgroundColor: "blue" }}></div>
                  <div class="color" style={{ backgroundColor: "pink" }}></div>
                </div>
                <div class="brush-thickness">
                  <div class="range-slider">
                    <input
                      class="input-range"
                      orient="vertical"
                      type="range"
                      step="1"
                      min="1"
                      max="10"
                      value="5"
                    />
                    <span class="range-value"></span>
                  </div>
                  <div class="thickness-strokes pos-rel">
                    <div class="ts-10"></div>
                    <div class="ts-9"></div>
                    <div class="ts-8"></div>
                    <div class="ts-7"></div>
                    <div class="ts-6"></div>
                    <div class="ts-5"></div>
                    <div class="ts-4"></div>
                    <div class="ts-3"></div>
                    <div class="ts-2"></div>
                    <div class="ts-1"></div>
                  </div>
                </div>
                <div
                  class="container"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      display: "block",
                      touchAction: "none",
                      width: "600px",
                      height: "350px",
                    }}
                  >
                    <canvas
                      width="600"
                      height="450"
                      style={{ display: "block", position: "absolute" }}
                    ></canvas>
                    <canvas
                      width="600"
                      height="450"
                      style={{ display: "block", position: "absolute" }}
                    ></canvas>
                    <canvas
                      width="600"
                      height="450"
                      style={{ display: "block", position: "absolute" }}
                    ></canvas>
                    <canvas
                      width="600"
                      height="450"
                      style={{ display: "block", position: "absolute" }}
                    ></canvas>
                  </div>
                </div>
                <div className="div">
                  <button className="btn2">save</button>
                </div>
              </Modal>
            </div>
          ) : (
            <div className="flex-start">
              <div className="">anusha L.</div>
</div>
          )}
              
        </div>
{/*  
        <EditButtons
          handleSave={() => onSave(text)}
          saveLabel={adding ? "Add card" : "Save"}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
       */}
      </div>
    );
  }
}

export default CardEditor;
