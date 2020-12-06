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
    // console.log("render: ", this.props);
    return (
      <div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.framework)}>
        <div className={this.props.side}>
          <img src={!this.props.close ? this.props.framework_img_url: "https://img.icons8.com/color/search"} alt={this.props.framework_img_url}/>
        </div>
      </div>
    )
  }
}

export default Card;
