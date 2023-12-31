import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import QuizFormQuestion from "./QuizFormQuestion";
import LinkButton from "./LinkButton";
import ImageTextModule from "./ImageTextModule";
import ProgressBar from "./ProgressBar";
import { createStatistic } from "@/lib/api";

const questionsData = [
  {
    id: 1,
    question: "How much barking is ok for you?",
    topic: "barking",
    answers: [
      {
        answer: "I don't want any barking",
      },
      {
        answer: "A little bit of barking is ok",
      },
      {
        answer: "Barking doesn't bother me at all",
      },
    ],
  },
  {
    id: 2,
    question: "How much energy do you have for your dog?",
    topic: "energy",
    answers: [
      {
        answer: "I like to stay on the couch",
      },
      {
        answer: "A little exercise is welcome",
      },
      {
        answer: "I want my dog to be just as active as me",
      },
    ],
  },
  {
    id: 3,
    question: "How trainable should your dog be?",
    topic: "trainability",
    answers: [
      {
        answer: "My dog doesn't need to do any tricks",
      },
      {
        answer: "I want to teach my dog some tricks",
      },
      {
        answer: "My dog should be able to learn a lot",
      },
    ],
  },
  {
    id: 4,
    question: "How important is it that your dog gets along with children?",
    topic: "good_with_children",
    answers: [
      {
        answer: "It is not important, my dog won't be in contact with children",
      },
      {
        answer: "It would be good, but it's not crucial",
      },
      {
        answer: " It is very important, I want a friendly dog",
      },
    ],
  },
  {
    id: 5,
    question: "How easily should your dog get along with other dogs?",
    topic: "good_with_other_dogs",
    answers: [
      {
        answer: "I want my dog to only care about their home",
      },
      {
        answer: "My dog should be neutral with other dogs",
      },
      {
        answer: "I want a sociable dog",
      },
    ],
  },
  {
    id: 6,
    question: "How protective do you want your dog to be?",
    topic: "protectiveness",
    answers: [
      {
        answer: "I don't want a protective dog",
      },
      {
        answer: "A little protectiveness is good",
      },
      {
        answer: "I want an alert and protective dog",
      },
    ],
  },
  {
    id: 7,
    question: "Does it bother you if your dog sheds?",
    topic: "shedding",
    answers: [
      {
        answer: "It bothers me a lot",
      },
      {
        answer: "I don't mind if my dog sheds a little",
      },
      {
        answer: "I don't mind at all",
      },
    ],
  },
];

export default function QuizFormMultiStep() {
  const [formResults, setFormResults] = useState({});
  const [step, setStep] = useState(0);
  const router = useRouter();

  function handleNextButtonClick(topic, value) {
    setStep(step + 1);
    setFormResults((oldFormResults) => ({ ...oldFormResults, [topic]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams(formResults);

    await createStatistic({ params: formResults });

    router.push(`/quiz-results?${params}`);
  }

  return (
    <>
      {step <= questionsData.length - 1 && (
        <ImageTextModule>
          Answer the following questions and the genie will let you know which
          dog fits to you.
        </ImageTextModule>
      )}

      {step >= questionsData.length && (
        <ImageTextModule>
          Congratulations on going on this journey. Your perfect companion is
          waiting for you on the next page!
        </ImageTextModule>
      )}

      <StyledForm onSubmit={handleSubmit}>
        {step === questionsData.length ? (
          <LinkButton>Show my results</LinkButton>
        ) : (
          <QuizFormQuestion
            questionData={questionsData[step]}
            onNextButtonClick={handleNextButtonClick}
          />
        )}
      </StyledForm>

      {step <= questionsData.length - 1 && (
        <ProgressBar step={step} questionsData={questionsData} />
      )}
    </>
  );
}
const StyledForm = styled.form`
  margin: auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
