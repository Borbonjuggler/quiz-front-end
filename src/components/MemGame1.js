import React, {Component} from "react";
import Card from '../containers/Card';
import axios from 'axios';


class MemGame1 extends Component {

    state = {
        cardsBank: [],
        score: 0,
        responses: 0,
        // frameworks: ['angular2','vue','react','grunt','phantomjs','ember','babel','ionic','gulp','meteor','yeoman','yarn','nodejs','bower','browserify'],
        duplicatedCards: [],
        randomizedCards: [],
        finalizedCards: [],
        openedCards: [],
        number: 5
    };

    getCards = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + '/cards')
            .then(result => {
                console.log("RES",result)
                this.setState({cardsBank : result.data})
                this.start()
            })
            .catch(error => {
                console.log("ERR",error);
                console.log(error);
            });
    };


    handleClick(card, index){
      console.log("STATE BEFORE: ", index, this.state);
      if(this.state.openedCards.length === 2){
        setTimeout(() => {
          this.check()
        },750)
      } else {
        let framework = {
          card,
          index
        }
        console.log(framework)
        let finalizedCards = this.state.finalizedCards
        let frameworks = this.state.openedCards
        finalizedCards[index].close = false
        // finalizedCards[index].side = "front"

        frameworks.push(framework)
        this.setState({
          openedCards: frameworks,
          finalizedCards: finalizedCards
        })
        if(this.state.openedCards.length === 2){
          setTimeout(() => {
            this.check()
          },750)
        }
        console.log("STATE AFTER: ", finalizedCards[index]);
      }
    }

    check(){
      console.log("Checking: ", this.state.openedCards[0].index, this.state.openedCards[1]);
      let finalizedCards = this.state.finalizedCards
      if((this.state.openedCards[0].card.name === this.state.openedCards[1].name) && (this.state.openedCards[0].index !== this.state.openedCards[1].index)){
        finalizedCards[this.state.openedCards[0].index].complete = true
        finalizedCards[this.state.openedCards[1].index].complete = true
      } else {
        finalizedCards[this.state.openedCards[0].index].close = true
        finalizedCards[this.state.openedCards[1].index].close = true
      }
      this.setState({
        finalizedCards,
        openedCards: []
      })
    }

    start(){

      let finalizedCards = [];
      console.log("start: ", this.state.cardsBank.concat(this.state.cardsBank))

      this.setState({
        duplicatedCards: this.state.cardsBank.concat(this.state.cardsBank)
      })

      this.setState({
        randomizedCards: this.shuffle(this.state.duplicatedCards)
      })
      this.state.randomizedCards.map((name,index) => {
        // console.log("WWW: ", name);
        // name.close = true;
        // name.complete = false;
        // name.fail = false;
        // name.side = "back";
        // console.log("FFF: ", name);
        // finalizedCards.push(
        //   name
        // )
        finalizedCards.push({
          name,
          close: true,
          complete: false,
          fail: false,
          side: "back"
        })
      })

      this.setState({
        finalizedCards: finalizedCards
      })

    }

    shuffle(array){
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array
    }

    componentDidMount() {
        this.getCards();

    }

    playAgain = () => {
        this.getCards();
        this.setState(
            {
                score: 0,
                responses: 0
            });
    }

    render() {
        return (
          <div className="memgame">
              {
                this.state.finalizedCards.map((framework, index) => {
                  return <Card key={framework.index} framework={framework} click={() => {this.handleClick(framework.name,index)}} close={framework.close} complete={framework.complete}/>
                })
              }
          </div>
        );
    }
}

export default MemGame1;
