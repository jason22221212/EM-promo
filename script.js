document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 가져오기
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const endScreen = document.getElementById('end-screen');

    const startQuizButton = document.getElementById('start-quiz-button');
    const questionNumberElement = document.getElementById('question-number');
    const questionTextElement = document.getElementById('question-text');
    const optionOButton = document.getElementById('option-o');
    const optionXButton = document.getElementById('option-x');
    const resultMessageElement = document.getElementById('result-message');
    const explanationBox = document.getElementById('explanation-box');
    const explanationTextElement = document.getElementById('explanation-text');
    const nextButton = document.getElementById('next-button');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-button');

    let currentQuestionIndex = 0;
    let correctAnswersCount = 0; // 맞힌 문제 수를 저장할 변수

    // 퀴즈 데이터 (질문, 정답, 해설) - 이전 코드와 동일
    const quizData = [
        {
            question: "전자감독장치를 훼손하고 도주하면 최대 10년의 징역에 처해질 수 있다. (O/X)",
            answer: "O",
            explanation: "전자장치 부착 등에 관한 법률 제47조에 따르면, 전자장치를 훼손하거나 그 밖의 방법으로 그 효용을 해친 자는 7년 이하의 징역 또는 2천만원 이하의 벌금에 처해질 수 있습니다. 다만, 전자감독 대상자가 이전에 재범을 저지르거나 다른 범죄와 겹칠 경우 더 높은 형량에 처해질 수 있으므로, 10년은 경우에 따라 가능한 최대치라고 볼 수 있습니다."
        },
        {
            question: "전자감독 대상자는 외출 제한 등의 준수사항을 지키지 않아도 처벌받지 않는다. (O/X)",
            answer: "X",
            explanation: "전자장치 부착 등에 관한 법률 제9조의2에 따르면, 전자감독 대상자는 법원이 정한 외출 제한, 주거지 제한, 피해자 접근 금지 등 준수사항을 반드시 지켜야 합니다. 이를 위반할 경우 보호관찰관의 경고를 받거나, 검사의 청구로 구치소에 유치될 수 있으며, 심각한 위반 시에는 부착명령이 취소되어 재수감될 수도 있습니다."
        },
        {
            question: "전자감독제도는 재범을 억제하고 사회 안전을 증진하는 데 기여한다. (O/X)",
            answer: "O",
            explanation: "전자감독제도는 특정 범죄자들이 사회에 복귀하면서도 재범을 저지를 위험을 줄이기 위해 도입된 제도입니다. 실시간 위치 추적 및 이동 제한 등을 통해 대상자의 일탈을 사전에 방지하고, 이를 통해 시민들의 안전을 확보하는 데 중요한 역할을 합니다. 실제로 전자감독 대상자의 재범률은 비대상자보다 낮은 것으로 나타나고 있습니다."
        },
        {
            question: "전자감독장치는 오직 성범죄자에게만 부착된다. (O/X)",
            answer: "X",
            explanation: "전자감독장치는 성범죄자 외에도 미성년자 유괴범죄, 살인범죄, 강도범죄 등 재범 위험이 높은 특정 강력 범죄자들에게 부착될 수 있습니다. 그 목적은 범죄 유형과 관계없이 사회 안전을 확보하고 재범을 방지하는 데 있습니다."
        },
        {
            question: "전자감독 대상자는 자유로운 직업 활동이 완전히 제한된다. (O/X)",
            answer: "X",
            explanation: "전자감독 대상자의 직업 활동이 완전히 제한되는 것은 아닙니다. 다만, 보호관찰소의 허가를 받아야 하며, 직업 특성상 야간 외출 제한이나 특정 지역 접근 금지 등의 준수사항을 위반할 소지가 있다면 제한될 수 있습니다. 이들의 사회 복귀를 돕기 위해 직업 훈련이나 취업 지원 프로그램도 연계될 수 있습니다."
        },
        {
            question: "전자감독장치는 항상 실시간으로 위치를 추적한다. (O/X)",
            answer: "O",
            explanation: "전자감독장치는 GPS 등 위치기반 기술을 활용하여 대상자의 위치를 24시간 실시간으로 추적합니다. 이는 대상자가 지정된 구역을 이탈하거나 특정 금지 구역에 접근하는 것을 즉시 감지하여 재범 위험을 사전에 차단하는 데 중요한 역할을 합니다."
        },
        {
            question: "전자감독제도는 대상자의 인권 침해 소지가 있다는 비판을 받기도 한다. (O/X)",
            answer: "O",
            explanation: "전자감독제도는 재범 방지와 사회 안전이라는 긍정적 효과에도 불구하고, 대상자의 사생활 침해 및 인권 침해 소지가 있다는 비판을 받기도 합니다. 따라서 제도를 운영함에 있어 인권 보호와 사회 안전 확보 간의 균형을 찾는 것이 중요하며, 과도한 감시가 되지 않도록 사회적 합의와 법적 기준이 필요합니다."
        },
        {
            question: "전자감독장치 배터리가 방전되면 자동으로 보호관찰관에게 통보된다. (O/X)",
            answer: "O",
            explanation: "전자감독장치는 배터리 잔량이 부족해지면 자동으로 보호관찰관에게 경고 신호를 보냅니다. 이는 대상자가 고의로 장치를 방치하여 위치 추적을 회피하는 것을 방지하고, 장치가 항상 정상적으로 작동할 수 있도록 관리하기 위함입니다. 대상자는 주기적으로 장치를 충전해야 할 의무가 있습니다."
        },
        {
            question: "전자감독 대상자의 정보는 누구나 자유롭게 조회할 수 있다. (O/X)",
            answer: "X",
            explanation: "전자감독 대상자의 개인 정보는 엄격하게 보호되며, 관련 법률에 따라 제한된 인원(보호관찰관, 경찰 등)만 접근할 수 있습니다. 무분별한 정보 공개는 대상자의 사회 복귀를 저해하고 인권 침해로 이어질 수 있으므로, 정보 보호는 매우 중요합니다."
        },
        {
            question: "전자감독제도는 한 번 부착되면 영구적으로 유지된다. (O/X)",
            answer: "X",
            explanation: "전자감독제도는 법원에서 정한 일정 기간 동안만 부착됩니다. 부착 기간은 대상자의 범죄 유형, 재범 위험성, 사회 복귀 노력 등을 종합적으로 고려하여 결정됩니다. 기간이 만료되거나 특별한 사유가 발생하면 전자감독은 해제될 수 있습니다."
        }
    ];

    // 스크린 전환 함수
    function showScreen(screenId) {
        startScreen.classList.add('hidden');
        quizScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        document.getElementById(screenId).classList.remove('hidden');
    }

    function loadQuestion() {
        if (currentQuestionIndex < quizData.length) {
            const question = quizData[currentQuestionIndex];
            questionNumberElement.textContent = `문제 ${currentQuestionIndex + 1}`;
            questionTextElement.textContent = question.question;

            // 이전 결과 및 해설 숨기기
            resultMessageElement.textContent = '';
            explanationBox.classList.add('hidden');
            nextButton.classList.add('hidden');

            // 버튼 활성화 및 초기화
            optionOButton.disabled = false;
            optionXButton.disabled = false;
            optionOButton.classList.remove('correct', 'incorrect');
            optionXButton.classList.remove('correct', 'incorrect');

        } else {
            // 모든 퀴즈 완료 -> 결과 화면 표시
            showScreen('end-screen');
            finalScoreElement.textContent = `총 10문제 중 ${correctAnswersCount}문제를 맞추셨습니다!`;
        }
    }

    function checkAnswer(selectedAnswer) {
        const question = quizData[currentQuestionIndex];
        const correctAnswer = question.answer;

        // 버튼 비활성화
        optionOButton.disabled = true;
        optionXButton.disabled = true;

        if (selectedAnswer === correctAnswer) {
            resultMessageElement.textContent = '정답입니다!';
            resultMessageElement.style.color = '#27ae60'; // 녹색
            correctAnswersCount++; // 정답 카운트 증가
            if (selectedAnswer === 'O') {
                optionOButton.classList.add('correct');
            } else {
                optionXButton.classList.add('correct');
            }
        } else {
            resultMessageElement.textContent = '오답입니다!';
            resultMessageElement.style.color = '#e74c3c'; // 빨간색
            if (selectedAnswer === 'O') {
                optionOButton.classList.add('incorrect');
                optionXButton.classList.add('correct'); // 정답인 버튼 표시
            } else {
                optionXButton.classList.add('incorrect');
                optionOButton.classList.add('correct'); // 정답인 버튼 표시
            }
        }

        // 해설 표시
        explanationTextElement.textContent = question.explanation;
        explanationBox.classList.remove('hidden');

        // 다음 문제 버튼 표시 (마지막 문제가 아니면)
        // 마지막 문제의 경우, nextButton 대신 EndScreen으로 전환되므로 이 버튼을 숨깁니다.
        if (currentQuestionIndex < quizData.length - 1) {
            nextButton.classList.remove('hidden');
        }
    }

    // 이벤트 리스너
    startQuizButton.addEventListener('click', () => {
        currentQuestionIndex = 0; // 퀴즈 시작 시 인덱스 초기화
        correctAnswersCount = 0; // 퀴즈 시작 시 점수 초기화
        showScreen('quiz-screen'); // 퀴즈 화면 표시
        loadQuestion(); // 첫 번째 질문 로드
    });

    optionOButton.addEventListener('click', () => checkAnswer('O'));
    optionXButton.addEventListener('click', () => checkAnswer('X'));

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    restartButton.addEventListener('click', () => {
        showScreen('start-screen'); // 다시 시작 버튼 클릭 시 시작 화면으로
    });

    // 페이지 로드 시 초기 화면 표시
    showScreen('start-screen');
});
