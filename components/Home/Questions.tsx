'use client'

import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import style from './Questions.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { buttonQuestionsVariants } from '@/components/Home/variants'
import { commonAnimations, getSpringTransition } from '@/lib/animations'
import TypingText from '@/ui/TypingText/TypingText'

const Questions: FC = () => {
	const [question, setQuestion] = useState(0)

	const buttons = ['Правила', 'О создателе']
	const types = ['Rules, they are needed', 'About our creator']

	return (
		<div className={style.questions}>
			<div className={style.top}>
				<div className={style.buttons}>
					{buttons.map((value, index) => {
						return <Button key={index} value={value} index={index} question={question} setQuestion={setQuestion} />
					})}
				</div>
				<AnimatePresence>
					<TypingText className={style.type} charClassName={style.char} text={types[question]} delay={.1} />
				</AnimatePresence>
			</div>
			<main className={style.main}>

			</main>
		</div>
	)
}

interface ButtonI {
	value: string
	index: number
	question: number
	setQuestion: Dispatch<SetStateAction<number>>
}

const Button: FC<ButtonI> = props => {
	return (
		<button
			onClick={() => props.setQuestion(props.index)}
			className={style.button}>
			<span
				data-is-active={props.question === props.index}
				className={style.buttonText}>
				{props.value}
			</span>
			{props.question === props.index && (
				<motion.div
					variants={buttonQuestionsVariants}
					{...commonAnimations}
					transition={getSpringTransition(20, 100)}
					className={style.buttonBackground} layoutId={'button'} />
			)}
		</button>
	)
}

export default memo(Questions)
