import React from 'react';

export const Faq = () => (
	<div className="uk-section uk-section-secondary uk-flex uk-flex-around uk-flex-wrap" id="faq">
		<div className="uk-container-small fullwidth">
			<h2 className="h1-light text-align-center text-purple">FAQ</h2>
		</div>
		<div className="uk-container fullwidth uk-flex uk-flex-between uk-flex-wrap">
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>What is Hello World?</h3>
					<p>
						Hello World is hackathon for Purdue freshman. It’s an opportunity to build a
						cool project and develop your skills in a fun and collaborative space.
						You’ll be surrounded by your peers and will have access to all of the help
						and resources you need.
					</p>
				</div>
			</div>
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>What is a Hackathon?</h3>
					<p>
						A hackathon is not a place where people get together and try to break into
						websites. To us, hacking is when people come together to create awesome
						technical projects. People from all over the world will come together for
						Hackathons every few weeks, working together to make something amazing.
						Along the way there’s usually fun, food, and prizes.
					</p>
				</div>
			</div>
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>Do I need to be good at programming?</h3>
					<p>
						Nope! We’re going to have lots of volunteers and mentors who can help you
						throughout the weekend. On top of that, we’ve put together some awesome
						resources to help you get started with any language or platform you want.
					</p>
				</div>
			</div>
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>How do I apply?</h3>
					<p>
						Just sign up
						<a href="/#/register" style={{ color: 'white' }}> here!</a> with your Purdue email and fill out the
						application form. We’ll let you know in the next few weeks if you’ve been
						accepted.
					</p>
				</div>
			</div>
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>Do I need to pay?</h3>
					<p>
						Nope! Hello World is completely free. Just show up with your laptop and
						charger, and we’ll provide the food, friends, prizes, and mentors.
					</p>
				</div>
			</div>
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>Are teams allowed?</h3>
					<p>Yes! You can have teams of up to 4 people.</p>
				</div>
			</div>
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>What are the rules?</h3>
					<p>
						The project you make for Hello World has to be brand new-- you can’t use
						code that you’ve written before the event. And of course, be respectful of
						others. Harassment and abuse are never tolerated.
					</p>
				</div>
			</div>
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>When is Hello World?</h3>
					<p>
						Hello World will take place on September 15th and 16th. We’ll have mentors
						and volunteers in the building for all 24 hours, so you can code through the
						night if you want! We’ll have a more detailed schedule coming soon.
					</p>
				</div>
			</div>
			<div className="uk-padding-small uk-width-1-3@m">
				<div className="uk-card uk-card-body fullheight bg-purple-faded">
					<h3>I have more questions!</h3>
					<p>
						No problem! You can email us at<span> </span>
						<a href="mailto:helloworld@purduehackers.com">
							helloworld@purduehackers.com
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
);
