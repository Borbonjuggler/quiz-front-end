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
    console.log("render: ", this.props.framework.side);
    return (
      <div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props)}>
        <div className={this.props.framework.side}>
          <img src={!this.props.close ? this.props.framework.name.framework_img_url: "https://img.icons8.com/color/search"} alt={this.props.framework_img_url}/>
        </div>
      </div>
    )
  }
}

export default Card;
