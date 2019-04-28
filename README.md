* Autism Pocket Book
  To provide one location for families with children on the autism spectrum a place to document interventions with the ability to enter multiple data points and provide scales suited to assess behavior.

* Goals
  * Easy to use
  * Customizable
  * Allow Note taking
  * Allow end parents to input multiple data points.
  * Capability to summarize totals, averages, and ranges in behavior over a period of time.

* Home page
    * NavBar links
      * How it works
      * Reports
      * Resources
      * Log in
    * Autism splash image
    * Description:
      USING THE AUTISM POCKETBOOK WILL MAKE IT POSSIBLE TO GAIN INSIGHT INTO WHAT TRIGGERS BEHAVOIRS AND CAN ASSIST FAMILIES INTO DEVELOPING STRATEGIES FOR THEIR CHILDREN.

* How it works page
    * This page will provide the parent a description of the website along with instructions on
      how to navigate the website.

* Reports page
    * This page will allow the ability to analyze data and generate graphs with phase
      lines based on specified date ranges.
        * Show items at a glance, by category based on a time frame selected.
        * Allow data to be exported by time frame into a .csv file for download.
        * Allow data to be synched in the cloud and accessed on multiple devices.

* Resources page
    * Links to credible websites that educate about autism.
    * Links to a database of acronyms/glossary of terms
    * Links to Facebook and Twitter.

* Login page
    * This page will allow a parent to create an account and login into the website
        * Provide name (First and Last)
        * Email address will become user ID
        * Password with a minimu of 8 characters with at least one capital and one symbol.

* Dashboard page
    * This page will allow a parent to create initial data for their autistic child.
        * Name of Child, First, Middle, Last
        * Date of Birth
        * Age of Autism Diagnosis
        * Primary Care Provider
        * Current Interventions (drop down box)
            * Applied Behavior Analysis
            * Speech Therapy
            * Occupational Therapy
            * Music Therapy
            * Physical Therapy
            * Feeding Therapy
            * Social Skills Therapy
            * Medication Management
            * Biomedical treatment
            * Nutritional Interventions
            * Other
        * School Accommodations (Drop down box)
            * Visual schedule
            * Adaptive Devices
            * Extra time
            * Frequent feedback
            * Opportunity for pull out time
            * Sensory Breaks
            * Aide Provided
            * Other
        * Level of Autism Diagnosis (3 boxes with a definition)
            * Level 1: Requiring Support
                Social: An individual with this diagnosis will have deficits in social communication that cause them noticeable impairments.  They show difficulties with starting social interactions and have difficulties with properly interacting with peers.   They will likely be verbal, but could have difficulties with using language in a proper manner.

                Behavior/Interest:  An individual with this diagnosis will have repetitive type behaviors and routines/rituals that interfere with day-to-day life.  This can include things such as difficulty with transitions and inflexible behaviors.

            * Level 2: Requiring Substantial Support
                Social: An individual with this diagnosis will have deficits in social communication, that will include both verbal and nonverbal.  These impairments are noticeable even with extra supports in place for the individual.  The individual will have difficulties with starting social interactions and have difficulties with properly interacting with peers.

                Behavior/Interest:  An individual with this diagnosis will have repetitive type behaviors and routines/rituals that interfere with day-to-day life.  This can include things such as difficulty with transitions and inflexible behaviors.  These behaviors will however be frequent enough to be noticed by those around them.  When these behaviors are interrupted, the individual will become frustrated and have difficulty with being redirected from the item of interest.

            * Level 3: Requiring Very Substantial Support
                Social: An individual with this diagnosis will have severe deficits in social communication, that will include both verbal and nonverbal communication.  This causes severe limitations in social interactions with others and will have very little response to social interactions from others.

                Behavior/Interest:  An individual with this diagnosis will have inflexible behaviors, very restrictive routines/rituals, extreme difficulty change and transitions, or other restricted behaviors that severely interfere with functioning in all areas. The individual will have extreme difficulty with being redirected from an item of interest.

        * Co-Factors: (Drop Down Box)
            ADD
            ADHD
            Anxiety
            Depression
            OCD
            Sensory Integration Disorder
            Gifted
            Tourette’s
            Auditory Processing
            Expressive Language Delay
            Learning Difficulties
            Seizures
            Food Allergies
            Other
            
        * Medications: (Up to 10)
            Name
            Frequency
            Dose

* Calendar page
    * This page will display a calendar in which a parent can click on date and enter
      their childs behavior attributes for that day. 

        * Mood (drop down)
            * Calm,
            * Sad
            * Anxious
            * Happy
            * Frustrated

        * Sleep (drop down)
            * Well rested
            * Woke up 
            * Woke up several times

        * Nutrition (drop down)
            * Full Meals/Balanced Diet
            * Skipped Meals
            * Supplements taken
            * Probiotic
            * Prebiotic
            * Regular Bowel Movements

        * Behavior (drop down)
            * No issues
            * On task
            * Minor issues 2-3 a day
            * Disruptive
            * Motor/Verbal stimming
            * Severe meltdown
            * Elopement
            * Property Destruction
            * Self-Injurious Behavior

        * Sensory Regulation (drop down)
            * High
            * Moderate
            * Low

        * Exercise (drop down)
	        * Low
	        * Moderate
	        * High

        * Weather (drop down)
	        * Sunny
	        * Cloudy
	        * Rain/Snow

        * Notes section:
            Free form text area to write notes.

Technical Aspects:
    * The Application will be MERN
        * Mongo database
            * Store parents credentials.
            * The child(s) information and daily status.
        * Express
            * Back-end library to handle API requests from UI to access the Mongo database.
        * React
            * Front-end library
        * NodeJs
            * Back-end server


