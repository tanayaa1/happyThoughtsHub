import React from "react";
import "./About.css"; // Import the CSS file
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import ReactPlayer from "react-player";
const MentalHealthAwareness = () => {
	const [ourText, setOurText] = useState("");
	const msg = new SpeechSynthesisUtterance();

	useEffect(() => {
		// Fetch the message from the <h1> tag
		const h1Element = document.querySelector(".speech2");
		if (h1Element) {
			setOurText(h1Element.textContent);
		}
	}, []);

	const speechHandler = (msg) => {
		msg.text = ourText;
		window.speechSynthesis.speak(msg);
	};
	const videoURL = "https://www.youtube.com/watch?v=AmARvccsdMI";
	return (
		<div className="about">
			<header>
				<h1>Mental Health Awareness</h1>
			</header>

			<main>
				<section id="hero" className="hero">
					<h2>Welcome to Our Mental Health Awareness Website</h2>
					<p className="speech1">
        <h5 className="speech2">
            Mental health is not a sign of weakness; it is a testament to the strength of the human spirit.
            
        </h5>
        <h5>
            Just as we care for our physical well-being, we must prioritize and nurture our mental well-being too.
            Seeking help and support for mental health challenges is an act of courage, resilience, and self-empowerment.
            Let us break the stigma and embrace the truth: mental health is a vital part of our overall health, and caring for it is a mark of true strength and wisdom.
            Together, by fostering empathy, understanding, and compassion, we can build a world where everyone feels safe to share their struggles and find healing, hope, and happiness on their journey to well-being.
            Remember, you are not alone, and seeking help is not a sign of weakness—it is a courageous step towards inner strength and a brighter future.
        </h5>
      </p>
					<input
						type="text"
						value={"Mental health is not a sign of weakness it is a testament to the strength of the human spirit"}
						placeholder="Enter Text"
						onChange={(e) => setOurText(e.target.value)}
					/>
					<button onClick={() => speechHandler(msg)}>SPEAK</button>
				</section>

				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="0">
						<Accordion.Header>Anxiety Disorders</Accordion.Header>
						<Accordion.Body>
							In 2019, 301 million people were living with an anxiety disorder
							including 58 million children and adolescents (1). Anxiety
							disorders are characterised by excessive fear and worry and
							related behavioural disturbances. Symptoms are severe enough to
							result in significant distress or significant impairment in
							functioning. There are several different kinds of anxiety
							disorders, such as: generalised anxiety disorder (characterised by
							excessive worry), panic disorder (characterised by panic attacks),
							social anxiety disorder (characterised by excessive fear and worry
							in social situations), separation anxiety disorder (characterised
							by excessive fear or anxiety about separation from those
							individuals to whom the person has a deep emotional bond), and
							others. Effective psychological treatment exists, and depending on
							the age and severity, medication may also be considered.
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<Accordion.Header>Depression</Accordion.Header>
						<Accordion.Body>
							In 2019, 280 million people were living with depression, including
							23 million children and adolescents (1). Depression is different
							from usual mood fluctuations and short-lived emotional responses
							to challenges in everyday life. During a depressive episode, the
							person experiences depressed mood (feeling sad, irritable, empty)
							or a loss of pleasure or interest in activities, for most of the
							day, nearly every day, for at least two weeks. Several other
							symptoms are also present, which may include poor concentration,
							feelings of excessive guilt or low self-worth, hopelessness about
							the future, thoughts about dying or suicide, disrupted sleep,
							changes in appetite or weight, and feeling especially tired or low
							in energy. People with depression are at an increased risk of
							suicide. Yet, effective psychological treatment exists, and
							depending on the age and severity, medication may also be
							considered.
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header>Bipolar Disorder </Accordion.Header>
						<Accordion.Body>
							In 2019, 40 million people experienced bipolar disorder (1).
							People with bipolar disorder experience alternating depressive
							episodes with periods of manic symptoms. During a depressive
							episode, the person experiences depressed mood (feeling sad,
							irritable, empty) or a loss of pleasure or interest in activities,
							for most of the day, nearly every day. Manic symptoms may include
							euphoria or irritability, increased activity or energy, and other
							symptoms such as increased talkativeness, racing thoughts,
							increased self-esteem, decreased need for sleep, distractibility,
							and impulsive reckless behaviour. People with bipolar disorder are
							at an increased risk of suicide. Yet effective treatment options
							exist including psychoeducation, reduction of stress and
							strengthening of social functioning, and medication.
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="3">
						<Accordion.Header>
							Post-Traumatic Stress Disorder (PTSD)
						</Accordion.Header>
						<Accordion.Body>
							The prevalence of PTSD and other mental disorders is high in
							conflict-affected settings (3). PTSD may develop following
							exposure to an extremely threatening or horrific event or series
							of events. It is characterised by all of the following: 1)
							re-experiencing the traumatic event or events in the present
							(intrusive memories, flashbacks, or nightmares); 2) avoidance of
							thoughts and memories of the event(s), or avoidance of activities,
							situations, or people reminiscent of the event(s); and 3)
							persistent perceptions of heightened current threat. These
							symptoms persist for at least several weeks and cause significant
							impairment in functioning. Effective psychological treatment
							exists.{" "}
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="4">
						<Accordion.Header>Schizophrenia</Accordion.Header>
						<Accordion.Body>
							Schizophrenia affects approximately 24 million people or 1 in 300
							people worldwide (1). People with schizophrenia have a life
							expectancy 10-20 years below that of the general population (4).
							Schizophrenia is characterised by significant impairments in
							perception and changes in behaviour. Symptoms may include
							persistent delusions, hallucinations, disorganised thinking,
							highly disorganised behaviour, or extreme agitation. People with
							schizophrenia may experience persistent difficulties with their
							cognitive functioning. Yet, a range of effective treatment options
							exist, including medication, psychoeducation, family
							interventions, and psychosocial rehabilitation.{" "}
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="5">
						<Accordion.Header>Eating Disorders</Accordion.Header>
						<Accordion.Body>
							In 2019, 14 million people experienced eating disorders including
							almost 3 million children and adolescents (1). Eating disorders,
							such as anorexia nervosa and bulimia nervosa, involve abnormal
							eating and preoccupation with food as well as prominent body
							weight and shape concerns. The symptoms or behaviours result in
							significant risk or damage to health, significant distress, or
							significant impairment of functioning. Anorexia nervosa often has
							its onset during adolescence or early adulthood and is associated
							with premature death due to medical complications or suicide.
							Individuals with bulimia nervosa are at a significantly increased
							risk for substance use, suicidality, and health complications.
							Effective treatment options exist, including family-based
							treatment and cognitive-based therapy.
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="6">
						<Accordion.Header>
							Disruptive behaviour and dissocial disorders
						</Accordion.Header>
						<Accordion.Body>
							40 million people, including children and adolescents, were living
							with conduct-dissocial disorder in 2019 (1). This disorder, also
							known as conduct disorder, is one of two disruptive behaviour and
							dissocial disorders, the other is oppositional defiant disorder.
							Disruptive behaviour and dissocial disorders are characterised by
							persistent behaviour problems such as persistently defiant or
							disobedient to behaviours that persistently violate the basic
							rights of others or major age-appropriate societal norms, rules,
							or laws. Onset of disruptive and dissocial disorders, is commonly,
							though not always, during childhood. Effective psychological
							treatments exist, often involving parents, caregivers, and
							teachers, cognitive problem-solving or social skills training.
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="7">
						<Accordion.Header>Neurodevelopmental disorders</Accordion.Header>
						<Accordion.Body>
							Neurodevelopmental disorders are behavioural and cognitive
							disorders, that? arise during the developmental period, and
							involve significant difficulties in the acquisition and execution
							of specific intellectual, motor, language, or social functions.
							Neurodevelopmental disorders include disorders of intellectual
							development, autism spectrum disorder, and attention deficit
							hyperactivity disorder (ADHD) amongst others. ADHD is
							characterised by a persistent pattern of inattention and/or
							hyperactivity-impulsivity that has a direct negative impact on
							academic, occupational, or social functioning. Disorders of
							intellectual development are characterised by significant
							limitations in intellectual functioning and adaptive behaviour,
							which refers to difficulties with everyday conceptual, social, and
							practical skills that are performed in daily life. Autism spectrum
							disorder (ASD) constitutes a diverse group of conditions
							characterised by some degree of difficulty with social
							communication and reciprocal social interaction, as well as
							persistent restricted, repetitive, and inflexible patterns of
							behaviour, interests, or activities.
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>

				<section id="videos" className="videos">
					<h2>Featured Videos</h2>

					<div class="video">
					<ReactPlayer url={videoURL} controls />	
					</div>
					
				</section>

				<section id="info" className="info">
					<h2>Mental Health Information</h2>
					<p>kjoij</p>
				</section>
			</main>

			<footer>
				<p>&copy; 2023 Mental Health Website. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default MentalHealthAwareness;
