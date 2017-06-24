$(document).ready(function() {
    
    $('#start-btn').click(function() {   
        replaceHeading();
        $('#start').fadeOut(500, function() {
            newGame();
            findQuestion();
            loadQuestion();
            $('#quiz').fadeIn(500);
        });
        $('#testimonials').fadeOut(500);
        $('.disclaim').fadeOut(500);
    });
    $('#answer-btn').click(function() {
        var user_answer = $('input:radio[name=ans]:checked').val();
        if (!user_answer) {
            alert('Please make a selection!');
        } else {
            if (correct(user_answer)) {
                $('#quiz').fadeOut(500, function() {
                    score++;
                    updateScore();
                    $('.answer-exp').text(quiz_questions[num]["answer-exp"]);
                    $('#correct').fadeIn(500);    
                });
            } else {
                $('#quiz').fadeOut(500, function() {
                    $('.answer-exp').text(quiz_questions[num]["answer-exp"]);
                    $('#wrong').fadeIn(500);
                });
            }
        }
    });
    $('.cont-btn').click(function() {       
        $('#correct').fadeOut(500, function() {
            $('#wrong').fadeOut(500, function() {
                if (count >= count_limit) {
                    updateScore();
                    updateRank();
                    $('#final').fadeIn(500);
                } else {
                    findQuestion();
                    loadQuestion();
                    $('form input').prop('checked', false);
                    $('#quiz').fadeIn(500);
                }
            });
        });
    });
    $('#start-over').click(function() {       
        $('#final').fadeOut(500, function() {
            newGame();
            findQuestion();
            loadQuestion();
            $('form input').prop('checked', false);
            $('#quiz').fadeIn(500);    
        });
    });
});

var num = 0;
var count = 0;
var count_limit = 10;
var score = 0;
var prior_questions = [];

var replaceHeading = function() {
    var head = $("<span>Space Trivia</span>");
    $('h1').find("span").remove();
    $('h1').append(head);
};

var newGame = function() {
    num = 0;
    count = 0;
    score = 0;
    prior_questions = [];
};
var findQuestion = function() {
    pickQuestion();
    while (wasAsked()) {
        pickQuestion();
    }
};
var pickQuestion = function() {
    var limit = Object.keys(quiz_questions).length;
    num = Math.floor((Math.random() * limit) + 1)
};
var wasAsked = function() {
    var result = false;
    for (var i=0;i<=prior_questions.length;i++){
        if (num == prior_questions[i]) {
            result = true;
        }
    }
    return result;
};
var loadQuestion = function() {
    prior_questions.push(num);    
    $('#icon').html("<i class=\"fa fa-"+quiz_questions[num]["icon"]+"\"></i>");
    $('#text').html(quiz_questions[num]["question"]);
    $('#option-1').html(quiz_questions[num]["options"][1]);
    $('#option-2').html(quiz_questions[num]["options"][2]);
    $('#option-3').html(quiz_questions[num]["options"][3]);
    $('#option-4').html(quiz_questions[num]["options"][4]);
    $('#option-5').html(quiz_questions[num]["options"][5]);
    updateScore();
    count++;
    $('.progress').text(count+"/"+count_limit);
};
var correct = function(user_answer) {
    if (user_answer == quiz_questions[num]["answer"]) {
        return true;
    } else {
        return false;
    }
};
var updateScore = function() {
    $('.score').text(score);
};
var updateRank = function() {
    if (score == 10){
        $('.rank').text('Captain');
        $('.rank-msg').text('Perfect Score! You got rank of Captain, who is the expert of all space knowledge and ship navigation. You set the plan for space travel.');
    } else if (score >= 7 && score <=  9) {
        $('.rank').text('Helmsman');
        $('.rank-msg').text('You got rank of Helmsman! You are adept at plotting the ship’s course through asteroid fields and nebulae.');
    } else if (score >= 4 && score <= 6) {
        $('.rank').text('Engineer');
        $('.rank-msg').text('You got rank of Engineer. You have some space knowledge, and you can work your way around the ship.');
    } else if (score >= 1 && score <= 3) {
        $('.rank').text('Sensor Officer');
        $('.rank-msg').text('You got rank of Sensor Officer. You don’t have the best space knowledge, so the crew uses you to aim sensors to scan and lock on enemy targets');
    } else if (score == 0) {
        $('.rank').text('Shield Officer');
        $('.rank-msg').text('You got rank of Shield Officer. You don’t know anything about space, so you stay on the ship and hold shields in place when asteroids hit.');
    }
};
var quiz_questions = {
    1: {
        "icon": "sun",
        "question": "What is the approximate temperature at the surface of the Sun?",
        "options": {
            1: "1,500 C",
            2: "3,000 C",
            3: "50 C",
            4: "5,600 C",
            5: "7,500 C"
        },
        "answer": 4,
        "answer-exp": "The temperature at the surface of the Sun is about 10,000 Fahrenheit (5,600 Celsius). The temperature rises from the surface of the Sun inward towards the very hot center of the Sun where it reaches about 27,000,000 Fahrenheit (15,000,000 Celsius). "
    },
    2: {
        "icon": "clock-o",
        "question": "Which force bends light rays travelling through the universe?",
        "options": {
            1: "atomic energy",
            2: "light energy",
            3: "gravity",
            4: "sound ",
            5: "heat energy"
        },
        "answer": 3,
        "answer-exp": "According to Einstein's General Relativity Theory,light will be affected in the same way matter is affected by <strong>gravity</strong>. This is because under this theory, we should think of gravity not in terms of vector like forces, but as a consequence of the shape of the universe."
    },
    3: {
        "icon": "clock-o",
        "question": "Which planet orbits the Sun four times in the time it takes the Earth to go round once?",
        "options": {
            1: "Neptune",
            2: "Jupiter",
            3: "Mars",
            4: "Venus",
            5: "Mercury"
        },
        "answer": 5,
        "answer-exp": "To break it down, Mercury takes roughly 88 Earth days to complete a single orbit around the Sun. Between this rapid orbital period and its slow rotational period, a single year on Mercury is actually shorter than a single day!"
    },
    4: {
        "icon": "bolt",
        "question": "What was the first artificial satellite?",
        "options": {
            1: "Sputnik I",
            2: "Sputnik II",
            3: "Challenger",
            4: "Explorer I",
            5: "Mariner 9"
        },
        "answer": 1,
        "answer-exp": "On Oct. 4, 1957, Sputnik 1 successfully launched and entered Earth's orbit. Thus, began the space age. The successful launch shocked the world, giving the former Soviet Union the distinction of putting the first human-made object into space. The word 'Sputnik' originally meant 'fellow traveler,' but has become synonymous with 'satellite' in modern Russian."
    },
    5: {
        "icon": "male",
        "question": "What is the name of the space shuttle destroyed in midair 28 Jan 1986?",
        "options": {
            1: "Aerial I",
            2: "Challenger",
            3: "SELENE",
            4: "Juno",
            5: "Telstar"
        },
        "answer": 2,
        "answer-exp": "On January 28, 1986, the American shuttle orbiter Challenger broke up 73 seconds after liftoff, bringing a devastating end to the spacecraft’s 10th mission. "
    },
    6: {
        "icon": "ship",
        "question": "What, ultimately, will the Sun become?",
        "options": {
            1: "a red dwarf",
            2: "a meteroid",
            3: "a black hole",
            4: "a white dwarf",
            5: "a neutron star"
        },
        "answer": 4,
        "answer-exp": "When the Sun has run out of hydrogen in its core in 4-5 billion years time, puffed up into a huge, angry red giant (eating up all the inner planets, from Mercury to the Earth), and then ejected its plasma into space, forming a vast planetary nebula. What is left behind is a <strong>white dwarf</strong> where the Sun used to be and the outer planets are orbiting at an expanded distance from the Sun. "        
    },
    7: {
        "icon": "clock-o",
        "question": "Who was the first living creature in space?",
        "options": {
            1: "Laika, a dog",
            2: "Albert, a monkey",
            3: "Gordo, a squirrel monkey",
            4: "Ham, a chimpanzee",
            5: "Felix, a cat"
        },
        "answer": 1,
        "answer-exp": "Laika was a young, mostly-Siberian husky. She was rescued from the streets of Moscow. Soviet scientists assumed that a stray dog would have already learned to endure harsh conditions of hunger and cold temperatures. Laika and two other dogs were trained for space travel by being kept in small cages and learning to eat a nutritious gel that would be their food in space."
    },
    8: {
        "icon": "beer",
        "question": "What is the name of the theory that the universe appears the same wherever and whenever viewed?",
        "options": {
            1: "quantum thoery",
            2: "bootstrap theory",
            3: "steady-state theory",
            4: "relativity theory",
            5: "Einstein's theory"
        },
        "answer": 3,
        "answer-exp": "The steady-state theory is a view that the universe is always expanding but maintaining a constant average density, matter being continuously created to form new stars and galaxies at the same rate that old ones become unobservable as a consequence of their increasing distance and velocity of recession."
    },
    9: {
        "icon": "car",
        "question": "What shape is the Milky Way?",
        "options": {
            1: "hexagonal",
            2: "dodecahedronal",
            3: "triangular",
            4: "circular",
            5: "spiral"
        },
        "answer": 5,
        "answer-exp": "When you look toward the Galactic Center with your eye, you see a long, thin strip of a <strong>spiral</strong>. This suggests a disk seen edge-on, rather than a ellipsoid or another shape. We can also detect the bulge at the center. Since we see spiral galaxies which are disks with central bulges, this is a bit of a tipoff."
    },
    10: {
        "icon": "calendar",
        "question": "Which planet has the Great Red Spot?",
        "options": {
            1: "Earth",
            2: "Venus",
            3: "Mercury",
            4: "Jupiter",
            5: "Saturn"
        },
        "answer": 4,
        "answer-exp": "The Great Red Spot is a persistent zone of high pressure, producing an anticyclonic storm on the planet Jupiter, 22° south of the equator. It has been continuously observed for 187 years, since 1830."
    },
    11: {
        "icon": "music",
        "question": "Which planet is the densest?",
        "options": {
            1: "Mercury",
            2: "Venus",
            3: "Earth",
            4: "Uranus",
            5: "Jupiter"
        },
        "answer": 3,
        "answer-exp": "Earth having the highest density of the rocky inner planets is largely due to its comparatively large core which is hypothesised to have formed according to the Giant impact hypothesis."
    },
    12: {
        "icon": "fighter-jet",
        "question": "Which planet takes almost 30 Earth years to orbit the Sun?",
        "options": {
            1: "Pluto",
            2: "Mars",
            3: "Saturn",
            4: "Jupiter",
            5: "Neptune"
        },
        "answer": 4,
        "answer-exp": "Saturn revolves or orbits around the Sun once every 29.4 Earth years, or once every 10,755.7 Earth days. Saturn travels at an average speed of 21,637 miles per hour or 34,821 kilometers per hour in its orbit around the Sun."
    },
    13: {
        "icon": "history",
        "question": "Which is the brightest comet in the solar system?",
        "options": {
            1: "Comet Encke",
            2: "Halley's Comet",
            3: "Comet Swift-Tuttle",
            4: "Comet Hale-Bopp",
            5: "Comet Shoemaker-Levy 9"
        },
        "answer": 2,
        "answer-exp": "Halley's Comet is the only naked-eye comet that might appear twice in a human lifetime. Halley last appeared in the inner parts of the Solar System in 1986 and will next appear in mid-2061."
    }
};

/*



*/






