import React, { Component } from 'react';
import ReactDOM from 'react-dom'; //webpage
import './assets/style.css';
import QuestionBox from './components/QuestionBox';
import Card from './components/MemGame';

import Result from './components/Result'
import axios from 'axios';


class PlayGround extends Component {

      state = {
        frameworks: ['angular2','vue','react','grunt','phantomjs','ember','babel','ionic','gulp','meteor','yeoman','yarn','nodejs','bower','browserify'],
        duplicatedFrameworks: [],
        randomizedFrameworks: [],
        finalizedFrameworks: [],
        openedFrameworks: []
      };
      // this.start()
    // }
    // handleClick(name,index){
    //   if(this.state.openedFrameworks.length === 2){
    //     setTimeout(() => {
    //       this.check()
    //     },750)
    //   }else {
    //     let framework = {
    //       name,
    //       index
    //     }
    //     let finalizedFrameworks = this.state.finalizedFrameworks
    //     let frameworks = this.state.openedFrameworks
    //     finalizedFrameworks[index].close = false
    //     frameworks.push(framework)
    //     this.setState({
    //       openedFrameworks: frameworks,
    //       finalizedFrameworks: finalizedFrameworks
    //     })
    //     if(this.state.openedFrameworks.length === 2){
    //       setTimeout(() => {
    //         this.check()
    //       },750)
    //     }
    //   }
    // }
    check(){
      let finalizedFrameworks = this.state.finalizedFrameworks
      if((this.state.openedFrameworks[0].name === this.state.openedFrameworks[1].name) && (this.state.openedFrameworks[0].index !== this.state.openedFrameworks[1].index)){
        finalizedFrameworks[this.state.openedFrameworks[0].index].complete = true
        finalizedFrameworks[this.state.openedFrameworks[1].index].complete = true
      }else {
        finalizedFrameworks[this.state.openedFrameworks[0].index].close = true
        finalizedFrameworks[this.state.openedFrameworks[1].index].close = true
      }
      this.setState({
        finalizedFrameworks,
        openedFrameworks: []
      })
    }
    // start(){
    //   let finalizedFrameworks = [];
    //   this.state.duplicatedFrameworks = this.state.frameworks.concat(this.state.frameworks)
    //   this.state.randomizedFrameworks = this.shuffle(this.state.duplicatedFrameworks)
    //   this.state.randomizedFrameworks.map((name,index) => {
    //     finalizedFrameworks.push({
    //       name,
    //       close: true,
    //       complete: false,
    //       fail: false
    //     })
    //   })
    //   this.state.finalizedFrameworks = finalizedFrameworks
    // }
    // shuffle(array){
    //   let currentIndex = array.length, temporaryValue, randomIndex;
    //   while (0 !== currentIndex) {
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex -= 1;
    //     temporaryValue = array[currentIndex];
    //     array[currentIndex] = array[randomIndex];
    //     array[randomIndex] = temporaryValue;
    //   }
    //   return array
    // }
//     render(){
//
//       return (
//         <div className="playground">
//             {
//               this.state.finalizedFrameworks.map((framework, index) => {
//                 return <Card framework={framework.name} click={() => {this.handleClick(framework.name,index)}} close={framework.close} complete={framework.complete}/>
//               })
//             }
//         </div>
//       )
//     }
}


class QuizzBee extends Component {

    state = {
        questionBank: [],
        score: 0,
        responses: 0,
        number: 5
    };

    getQuestions = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + '/' + this.state.number)
            .then(result => {
                this.setState({questionBank : result.data})
            })
            .catch(error => {
                console.log(error);
            });
    };

    computeAnswer = ( id, answer ) => {
        axios.post( process.env.REACT_APP_SERVER_URL + '/' +id + '/'+ answer )
        .then(result => {
            if(result.data){
                this.setState({ score: this.state.score + 1 });
            }
            this.setState({responses: this.state.responses < this.state.number ? this.state.responses + 1 : this.state.number});
          })
          .catch(error => {
            console.log(error);
          });
    }

    componentDidMount() {
        this.getQuestions();

    }

    playAgain = () => {
        this.getQuestions();
        this.setState(
            {
                score: 0,
                responses: 0
            });
    }

    render() {
        return (
            <div className="container">
                <div className="title">CIC-Quiz</div>
                {this.state.questionBank.length > 0 &&
                    this.state.responses < this.state.number &&
                    this.state.questionBank.map(
                        ({ question, answers, correct, id }) => (
                            <QuestionBox
                                question={question}
                                options={answers}
                                key={id}
                                selected={(answer) => this.computeAnswer(id, answer)} />
                        )
                    )
                }
                {this.state.responses === this.state.number ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
            </div>
        );
    }
}

class QuizzBee1 extends Component {

    state = {
        questionBank: [],
        score: 0,
        responses: 0,
        number: 5
    };

    getQuestions = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + '/' + this.state.number)
            .then(result => {
                this.setState({questionBank : result.data})
            })
            .catch(error => {
                console.log(error);
            });
    };

    computeAnswer = ( id, answer ) => {
        axios.post( process.env.REACT_APP_SERVER_URL + '/' +id + '/'+ answer )
        .then(result => {
            if(result.data){
                this.setState({ score: this.state.score + 1 });
            }
            this.setState({responses: this.state.responses < this.state.number ? this.state.responses + 1 : this.state.number});
          })
          .catch(error => {
            console.log(error);
          });
    }

    componentDidMount() {
        this.getQuestions();

    }

    playAgain = () => {
        this.getQuestions();
        this.setState(
            {
                score: 0,
                responses: 0
            });
    }

    render() {
        return (
            <div className="container">
                <div className="title">CIC-Quiz</div>
                {this.state.questionBank.length > 0 &&
                    this.state.responses < this.state.number &&
                    this.state.questionBank.map(
                        ({ question, answers, correct, id }) => (
                            <QuestionBox
                                question={question}
                                options={answers}
                                key={id}
                                selected={(answer) => this.computeAnswer(id, answer)} />
                        )
                    )
                }
                {this.state.responses === this.state.number ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
            </div>
        );
    }
}


ReactDOM.render(
  <QuizzBee />,
  <QuizzBee1 />,
  // <PlayGround/>,
  document.getElementById('root'));
