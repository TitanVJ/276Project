class catchState extends Phaser.State {

    init(profData){
        encounter = true;
        this.profObj = profData;
        this.profName = profData.prof_fname.toUpperCase() + ' ' + profData.prof_lname.toUpperCase();
        this.photo_id = profData.photo_id;
        this.questions = profData.questions; // array of 2 questions
        this.answers = profData.answers // array of 2 arrays each with 2 answer option and index of the correct answer
        this.qIndex = 0;
    }

    preload(){
        //need background image, for now use same background as main state
        //need prof image
        this.game.load.image('prof', '../images/prof_images/' + this.photo_id + '.jpg');
        this.game.load.image('back', './images/backBtn.png');
        this.game.load.image('btn', './images/btn.png');

    }

    create(){
        this.game.stage.backgroundColor = '#fff000';
        
        // draw  back btn to screen
        var backBtn = this.game.add.sprite(1000, 504, 'back');
        backBtn.scale.setTo(0.5, 0.5);
        backBtn.inputEnabled = true;
        backBtn.events.onInputDown.add(this.return, this);

        // prof image
        var profImg = this.game.add.sprite(45, 50, 'prof');
        profImg.scale.setTo(0.8, 0.8);


        // draw prof name to screen
        this.game.add.text(45,15, this.profName);

        // draw question to screen 
        this.q = this.game.add.text(555, 15, this.questions[this.qIndex]);

        // draw answers to screen
        this.a0 = this.game.add.text(555, 121, 'A:\t' + this.answers[this.qIndex][0]);
        this.a1 = this.game.add.text(555, 238, 'B:\t' + this.answers[this.qIndex][1]);

        // draw answer btns to screen 
        var btn0 = this.game.add.button(555, 400, 'btn', this.clickAction, this);
        var btn1 = this.game.add.button(855, 400, 'btn', this.clickAction, this);
        btn0.var = 0;
        btn1.var = 1;

        btn0.scale.setTo(0.25, 0.25);
        btn1.scale.setTo(0.25, 0.25);

        // draw text over btns
        this.game.add.text(630, 425, 'A');
        this.game.add.text(920, 425, 'B');

        // var style = {
        //     wordWrap: true,
        //     wordWrapWidth: btn0.width ,
        //     align: "center"
        // };

        // answers

    }   
    
    clickAction(e){
        if(e.var == this.answers[this.qIndex][2]){
            alert("CORRECT !!");
            this.correct++;
        }
        else{
            alert("WRONG !!");
        }

        if(this.qIndex == 0){
            //switch
            this.qIndex = 1;

            // update to new question 
            this.q.setText(this.questions[this.qIndex]);

            this.a0.setText('A: '+ this.answers[this.qIndex][0]);
            this.a1.setText('B: '+ this.answers[this.qIndex][1]);
        }
        else{
            // last question was done 
            console.log('trying to catch');
            var num = Math.floor((Math.random() * 100) + 1); 
            if(num < (90*(this.correct / 2))){
                // prof is caught
                $.ajax({
                    method: 'post', 
                    url: '/caught', 
                    data: this.profObj,
                    success: this.return
                });

            }
            else{
                alert("Failed to Catch\nGuess your RNG is pretty bad");
                this.return();
            }

        }

        // switch question

    }

    catch(){
        //random number < 90* number of corrent
    }

    return(){
        encounter = false;
        this.state.start('main', true, false);
    }
    update(){
        var coor = this.game.input.mousePointer.x + '\n' + this.game.input.mousePointer.y;
        // console.log(coor);
    }
}

export default catchState;