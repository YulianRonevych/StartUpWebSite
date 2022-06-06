import React, { useEffect, useRef } from 'react';
import FAQItem from './FAQItem';
import { useState } from 'react';

export default function FAQSection() {
    const questionList = [
        {
            id: 0,
            title: 'Is your website the best to create a successful startup?',
            body: 'Definitely! Our app allows you to share your ideas and find support from other entrepreneurs.',
            expanded: false,
        },
        {
            id: 1,
            title: 'How do I protect my idea?',
            body: 'You can file for patents, trademarks, and copyrights. If you have something propriety about your company, you should consider filing for a patent to temporarily protect your business in its infancy to get it up and running.',
            expanded: false,
        },
        {
            id: 2,
            title: 'What is the ideal team size?',
            body: 'Founding teams tend to be 2-3 people, ideally with at least one technical cofounder. Having many more founders will get distracting and slow things down.',
            expanded: false,
        },
        {
            id: 3,
            title: 'How do I know if my idea is good?',
            body: 'Talk to your customers. Are you making sales? Are those customers happy with the value you are providing? This ties back to Traction and Validation. If you have a validated concept and are building traction, odds are that your idea has some legs.',
            expanded: false,
        },
        {
            id: 4,
            title: 'What incubator should I apply to? ',
            body: 'There are tons of incubators sprouting up around the world. We can’t tell you which incubator is best for you, because a huge part of the incubation process is mentoring. You should find the incubator that offers the best mentors for your startup’s industry and try to get in there. Location also plays a large part in the decision process. ',
            expanded: false,
        },
        {
            id: 5,
            title: 'How much should I pay myself?',
            body: 'As little as you can to get by. Your startups resources are precious and likely to be slim. You want to squeeze as much value out of them as possible, and that means taking a personal pay cut. Investors who have given you capital to work on your idea also don’t want to see you handle their money irresponsibly by taking an unreasonable share.',
            expanded: false,
        },
    ];

    const ref = useRef(null);

    // useEffect(() => {
    //     const componentHeight = ref.current?.scrollHeight;
    //     // ref.current.style.height = 0;
    //     ref.current.removeAttribute('style');
    //     ref.current.console.log(ref.current?.scrollHeight, ref.current?.offsetHeight);
    // }, []);

    const [questions, setQuestions] = useState(questionList);

    function clickHandler(expandedQuestion) {
        if (expandedQuestion.expanded === true) {
            setQuestions(questionList);
            return;
        }
        if (expandedQuestion.expanded === false) {
            setQuestions(
                questionList.map((question) => {
                    if (expandedQuestion.id === question.id) {
                        return { ...question, expanded: !question.expanded };
                    }
                    return question;
                })
            );
        }
    }

    return (
        <div ref={ref} className="help__content">
            <h1 className="help__header">F.A.Q.</h1>
            <h2 className="help__title">
                Here you can find a list of most asked questions by our clients and users. If these question does not
                help you with some kind of a problem, please, contact us via email - support@startups.ua
            </h2>
            <div className="help__body">
                <div className="help__help-items help-items">
                    {questions.map((question) => (
                        <FAQItem key={question.id} question={question} onClick={clickHandler} />
                    ))}
                </div>
            </div>
        </div>
    );
}
