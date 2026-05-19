import { QUICK_START_STEPS } from './quickstart-data'

export function QuickStart() {
	return (
		<section id="quickstart" className="landing-section">
			<div className="landing-container">
				<div className="section-label">Quick start</div>
				<h2 className="section-title">Up and running in minutes</h2>
				<p className="section-desc">
					The boilerplate lives as a GitHub Template. Every new client project
					follows the same five steps.
				</p>

				<div className="quickstart">
					<div className="qs-header">
						<h3>New project setup</h3>
						<p>Repeat for every client engagement</p>
					</div>
					<ul className="qs-steps" role="list">
						{QUICK_START_STEPS.map((step, i) => (
							<li key={step.title} className="qs-step">
								<span className="qs-step-num">{i + 1}</span>
								<div className="qs-step-content">
									<div className="qs-step-title">{step.title}</div>
									<StepDescription description={step.description} />
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}

function StepDescription({ description }: { description: string }) {
	const parts = description.split(/(`[^`]+`)/g)
	return (
		<div className="qs-step-desc">
			{parts.map((part, i) => {
				if (part.startsWith('`') && part.endsWith('`')) {
					return (
						<code key={i} className="inline-code">
							{part.slice(1, -1)}
						</code>
					)
				}
				return <span key={i}>{part}</span>
			})}
		</div>
	)
}
