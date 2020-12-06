import React, {Component} from "react";
import QuestionBox from '../containers/QuestionBox';
import Result from '../containers/Result'
import axios from 'axios';


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
                <div className="title">CIC-Quizz</div>
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

export default QuizzBee;
