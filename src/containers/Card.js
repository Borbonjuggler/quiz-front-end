import React, { Component } from 'react';


class Card extends Component {
  constructor(props) {
      super(props)
      this.state = {

      }
    }
  clicked(framework){
    this.props.click(framework)
  }
  render(){
    // console.log("Card:render: ", this.props.close);
    return (
      <div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.framework)}>
        <div className="front">
          ?
        </div>
        <div className={this.props.side}>
          <img src={"https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" + this.props.framework + ".png"} />
        </div>
      </div>
    )
  }
}

export default Card;
