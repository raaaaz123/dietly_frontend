/**
 * Editorial copy for the muscle hubs (/exercises/muscle/[category]).
 *
 * The hubs were a title, one templated sentence and an alphabetical grid, so
 * "3/4 Sit-up" headed the abs page and the barbell squat sat 300 cards down
 * the quads page. Search Console already shows the calves hub at position ~6
 * for "best advanced calves exercises" with 351 words on it. These pages win
 * when they answer "which ones, and why", not when they list everything.
 *
 * Keyed by the hub's display name (after CATEGORY_NAME in exercises.ts).
 * `picks` are catalogue slugs in ranked order; any slug missing from the
 * current snapshot is skipped at render time, so a catalogue refresh can never
 * break a hub. Copy rule for this file: no em dashes.
 */

export type MuscleCopy = {
  /** The phrase people search, used in the title and H1. */
  keyword: string;
  intro: string[];
  picks: { slug: string; why: string }[];
  faqs: { q: string; a: string }[];
};

export const MUSCLE_COPY: Record<string, MuscleCopy> = {
  Back: {
    keyword: "Back workout",
    intro: [
      "Your back is two jobs: pulling down from overhead, which builds the width of the lats, and rowing towards your torso, which builds the thickness of the mid back, rhomboids and rear delts. A complete back workout has at least one of each, plus a hinge such as the deadlift for the spinal erectors.",
      "For most lifters, 10 to 20 hard sets a week across those patterns is the range that grows a back. Train it twice a week if you can, and add weight or reps every week you can do so with the same form.",
    ],
    picks: [
      { slug: "pull-up", why: "The best test and builder of lat strength. Bodyweight first, then add load." },
      { slug: "barbell-bent-over-row", why: "Heavy horizontal pulling for mid-back thickness." },
      { slug: "cable-wide-grip-lat-pulldown", why: "The pull-up pattern at any load, so beginners can train it properly." },
      { slug: "cable-seated-row", why: "A stable row you can take close to failure without the lower back giving out first." },
      { slug: "barbell-deadlift", why: "The hinge that loads the whole posterior chain, erectors included." },
      { slug: "lever-t-bar-row", why: "Chest-supported style rowing that lets you go heavy with less lower-back fatigue." },
    ],
    faqs: [
      {
        q: "How many back exercises should I do in one workout?",
        a: "Two to four. One vertical pull (pull-up or pulldown), one or two rows, and optionally a hinge. More exercises than that usually means fewer hard sets on each.",
      },
      {
        q: "Should I train back and biceps together?",
        a: "It works well, because every row and pulldown already trains the biceps. Do the back work first while you are fresh, then one or two curl variations.",
      },
    ],
  },

  Chest: {
    keyword: "Chest workout",
    intro: [
      "The chest grows from pressing and from fly movements that stretch the pecs under load. A good chest workout pairs one heavy press (barbell or dumbbell) with an incline press for the upper chest and one fly or dip to finish.",
      "Aim for 10 to 20 sets a week, split over two sessions. Pressing strength and chest size track each other closely, so a bench press that goes up over months is the simplest sign the program works.",
    ],
    picks: [
      { slug: "barbell-bench-press", why: "The heaviest chest press and the standard measure of pressing strength." },
      { slug: "dumbbell-bench-press", why: "A deeper stretch than the barbell and each side works on its own." },
      { slug: "barbell-incline-bench-press", why: "Shifts the work towards the upper chest, the part most physiques lack." },
      { slug: "dumbbell-incline-bench-press", why: "Upper-chest pressing with a free path for the shoulders." },
      { slug: "chest-dip", why: "A bodyweight press that loads the lower chest hard in the stretched position." },
      { slug: "cable-standing-fly", why: "Constant tension through the whole range, ideal as the last exercise." },
    ],
    faqs: [
      {
        q: "What is the best exercise for the upper chest?",
        a: "An incline press at 30 to 45 degrees, barbell or dumbbell. Steeper than that and the front delts take over.",
      },
      {
        q: "Are push-ups enough to build a chest?",
        a: "For a beginner, yes, as long as the sets are hard. Once you can do 25 or more clean reps, you need added load (a weighted vest, deficit push-ups or a bench press) to keep growing.",
      },
    ],
  },

  Shoulders: {
    keyword: "Shoulder workout",
    intro: [
      "The shoulder has three heads. Overhead pressing trains the front delts hard, lateral raises are the only practical way to train the side delts that make shoulders look wide, and rear-delt work such as face pulls balances all the pressing for joint health.",
      "Front delts already get plenty from chest pressing, so most lifters should spend their extra shoulder sets on side and rear delts: 8 to 16 sets a week of raises and face pulls on top of one press.",
    ],
    picks: [
      { slug: "barbell-standing-military-press", why: "The heavy overhead press for strength and front-delt size." },
      { slug: "dumbbell-lateral-raise", why: "The side-delt builder. Light, strict and taken close to failure." },
      { slug: "dumbbell-standing-overhead-press", why: "Overhead pressing with a freer path for the shoulder joint." },
      { slug: "band-face-pull", why: "Rear delts and rotator cuff together, the balance to all your pressing." },
      { slug: "arnold-press", why: "A press with rotation that covers the front and side delt in one movement." },
      { slug: "dumbbell-reverse-fly", why: "Direct rear-delt work for a rounder shoulder from the side." },
    ],
    faqs: [
      {
        q: "How do I get wider shoulders?",
        a: "Train the side delts directly with lateral raises, 3 to 5 sets two or three times a week, using a weight you can control for 12 to 20 reps. Losing body fat also makes the shoulder-to-waist ratio look wider.",
      },
      {
        q: "Is the overhead press bad for your shoulders?",
        a: "Not when the bar path is straight over the shoulder and the ribs stay down. If pressing hurts, try dumbbells or a landmine press, which let the arm move in a more natural arc.",
      },
    ],
  },

  Quadriceps: {
    keyword: "Quad workout",
    intro: [
      "The quadriceps straighten the knee, so they grow from squats, presses and lunges taken deep, plus leg extensions for direct work. Range matters: deep squats grow the quads at least as well as half squats, and the glutes and adductors clearly more.",
      "Most lifters do well with one heavy squat pattern, one single-leg movement and one machine for the quads, 10 to 20 sets a week. Single-leg work also exposes and fixes the left-right gap most people have.",
    ],
    picks: [
      { slug: "barbell-squat", why: "The heavy, full-range quad builder everything else is measured against." },
      { slug: "sled-45-degrees-leg-press", why: "Heavy quad work with no balance or lower-back limit." },
      { slug: "bulgarian-split-squat", why: "Single-leg work that fixes imbalances and needs very little weight." },
      { slug: "dumbbell-goblet-squat", why: "The easiest squat to learn, and a good high-rep finisher." },
      { slug: "lever-leg-extension", why: "The only exercise that trains the quads in their fully shortened position." },
      { slug: "barbell-lunge", why: "Walking or stationary, lunges add quad and glute work in one." },
    ],
    faqs: [
      {
        q: "Squat or leg press for bigger quads?",
        a: "Both build quads well. The squat also trains the trunk and the hips; the leg press lets you push the quads closer to failure without the lower back limiting you. Most programs use both.",
      },
      {
        q: "How deep should I squat?",
        a: "As deep as you can while keeping the lower back neutral, ideally with the hip crease below the top of the knee. In training studies, full squats grew the glutes and adductors more than half squats and the quads at least as much.",
      },
    ],
  },

  Glutes: {
    keyword: "Glute workout",
    intro: [
      "The glutes extend the hip, so the best glute exercises load hip extension heavily: hip thrusts and glute bridges at the top of the movement, and Romanian deadlifts and deep squats at the bottom, where the muscle is stretched. A complete glute workout uses one of each.",
      "Train glutes two or three times a week with 10 to 20 sets in total. Glutes recover quickly and respond to heavy loads and high reps alike, so progress the weight on thrusts and the reps on bridges.",
    ],
    picks: [
      { slug: "barbell-hip-thrust", why: "The heaviest glute exercise at full hip extension." },
      { slug: "barbell-romanian-deadlift", why: "Loads the glutes and hamstrings in the stretch, where growth is strongest." },
      { slug: "bulgarian-split-squat", why: "A forward lean turns it into one of the hardest glute exercises there is." },
      { slug: "barbell-sumo-deadlift", why: "A wide-stance hinge with more glute and adductor work than a conventional pull." },
      { slug: "glute-bridge-two-legs-on-floor", why: "The no-equipment version of the thrust, for home or warm-ups." },
      { slug: "lever-seated-hip-abduction", why: "Direct work for the glute medius, the upper-side shape of the hips." },
    ],
    faqs: [
      {
        q: "What is the best glute exercise?",
        a: "The hip thrust is the most effective at the top of the movement and the Romanian deadlift at the bottom. Using both covers the full range, which beats either one alone.",
      },
      {
        q: "Can I grow my glutes at home?",
        a: "Yes. Single-leg glute bridges, Bulgarian split squats and step-ups get hard fast with no weight, and a backpack or band adds the load when bodyweight gets easy.",
      },
    ],
  },

  Abs: {
    keyword: "Abs workout",
    intro: [
      "Abs show when two things are true: the muscles are developed and body fat is low enough to see them, usually around 10 to 15% for men and 18 to 22% for women. No abs workout spot-reduces fat, so the training below builds the muscle and the diet reveals it.",
      "Train abs like any other muscle: a few hard sets of loaded movements, 2 to 4 times a week. Pick one flexion exercise (crunch or leg raise), one anti-extension exercise (plank or rollout) and one rotation or anti-rotation exercise for the obliques.",
    ],
    picks: [
      { slug: "hanging-straight-leg-raise", why: "The hardest lower-ab and hip-flexor exercise, and it trains grip too." },
      { slug: "front-plank", why: "The base anti-extension exercise: trunk stiffness that carries over to every lift." },
      { slug: "ab-roller-crunch", why: "Rollout-style loading of the abs in the stretched position." },
      { slug: "cable-kneeling-crunch", why: "Spinal flexion you can load and progress like any other exercise." },
      { slug: "russian-twist", why: "Rotation for the obliques. Add a plate once bodyweight is easy." },
      { slug: "dead-bug", why: "Teaches the ribs-down position that makes every other core exercise work." },
    ],
    faqs: [
      {
        q: "How often should I train abs?",
        a: "Two to four times a week, 6 to 10 hard sets in total. Abs recover quickly, but daily high-rep crunches are less effective than a few loaded sets close to failure.",
      },
      {
        q: "Why can't I see my abs?",
        a: "Almost always body fat. Most people need to be lean, around 10 to 15% for men or 18 to 22% for women, before abs show. A steady calorie deficit and high protein do more than any ab exercise.",
      },
    ],
  },

  Biceps: {
    keyword: "Biceps workout",
    intro: [
      "Every curl trains the biceps, and the variations change where along the range it is hardest. Incline curls load the long head in a stretch, preacher curls load the bottom, and hammer curls shift work to the brachialis and forearm, which push the biceps up and make the arm look thicker.",
      "Rows and pulldowns already give the biceps some work, so 6 to 14 direct sets a week is enough for most people. Use a full range, control the lowering and add reps before you add weight.",
    ],
    picks: [
      { slug: "barbell-curl", why: "The heaviest curl, best for overall biceps strength." },
      { slug: "dumbbell-incline-curl", why: "Trains the long head in a deep stretch, which drives growth." },
      { slug: "dumbbell-hammer-curl", why: "Brachialis and forearm work for a thicker-looking arm." },
      { slug: "barbell-preacher-curl", why: "Locks the elbow so the biceps cannot cheat at the hard bottom range." },
      { slug: "cable-curl", why: "Constant tension at the top where dumbbells go slack." },
      { slug: "concentration-curl", why: "A strict, single-arm finisher with nowhere to swing." },
    ],
    faqs: [
      {
        q: "How do I get bigger biceps fast?",
        a: "Do 3 or 4 hard sets of two curl variations two or three times a week, take each set close to failure, and add a rep or a little weight every week. Eat enough protein and calories to grow; the arm grows with the rest of you.",
      },
      {
        q: "Barbell or dumbbell curls?",
        a: "Both work. The barbell lets you lift more; dumbbells let each arm work alone and let the wrist rotate. Use one of each across the week.",
      },
    ],
  },

  Triceps: {
    keyword: "Triceps workout",
    intro: [
      "The triceps are about two thirds of your upper arm, so bigger arms mostly means bigger triceps. The long head, the largest, crosses the shoulder and grows best when the arm is overhead or behind the body, which is why overhead extensions and skull crushers belong in every triceps workout.",
      "Bench press and dips already train the triceps heavily. Add 6 to 12 direct sets a week: one overhead or lying extension and one pushdown variation, both close to failure.",
    ],
    picks: [
      { slug: "barbell-lying-triceps-extension-skull-crusher", why: "Heavy long-head work in a stretch, the best mass builder for the triceps." },
      { slug: "cable-pushdown", why: "Easy to load, easy on the elbows, and good for high-rep sets." },
      { slug: "barbell-close-grip-bench-press", why: "The heaviest triceps press there is, with chest and shoulders helping." },
      { slug: "lever-triceps-dip", why: "Dip-pattern pressing with a machine that handles the balance for you." },
      { slug: "dumbbell-seated-triceps-extension", why: "Overhead extension that takes the long head to its full stretch." },
      { slug: "bench-dip-knees-bent", why: "A bodyweight option for home training." },
    ],
    faqs: [
      {
        q: "What is the best triceps exercise for mass?",
        a: "An overhead or lying extension, such as skull crushers or an overhead dumbbell extension, because it trains the long head in a stretch. Pair it with a heavy compound press like the close-grip bench.",
      },
      {
        q: "Why do my elbows hurt on triceps exercises?",
        a: "Usually too much weight on lying extensions or locking out hard. Lower the bar behind the head rather than to the forehead, use an EZ bar or cables, and keep a little bend at the top.",
      },
    ],
  },

  Calves: {
    keyword: "Calf workout",
    intro: [
      "Your calves are two muscles, and each needs its own position. The gastrocnemius crosses the knee and works hardest with the leg straight, so standing calf raises train it. The soleus sits underneath and takes over when the knee is bent, which is why seated calf raises are a separate exercise rather than a variation.",
      "Calves respond to the same things as any muscle: a full range (a deep stretch at the bottom, a one-second pause, then up onto the toes) and hard sets. 8 to 16 sets a week split over two or three sessions, mostly in the 8 to 20 rep range, is a good start.",
    ],
    picks: [
      { slug: "standing-calf-raise", why: "The main straight-knee exercise for the gastrocnemius." },
      { slug: "seated-calf-raise", why: "Bent-knee work for the soleus, which standing raises barely reach." },
      { slug: "donkey-calf-raise", why: "A hip-hinged position that puts the calf under a deep stretch. An advanced favourite." },
      { slug: "dumbbell-single-leg-calf-raise", why: "One leg at a time doubles the load without a machine, and evens out the sides." },
      { slug: "barbell-standing-calf-raise", why: "Heavy standing raises when there is no calf machine." },
      { slug: "sled-calf-press-on-leg-press", why: "Heavy, stable calf work on a machine most gyms have." },
    ],
    faqs: [
      {
        q: "What are the best advanced calf exercises?",
        a: "Single-leg standing calf raises from a deficit, donkey calf raises and heavy seated raises with a long pause in the stretch. What makes them advanced is the range and the pause, not the machine.",
      },
      {
        q: "Why won't my calves grow?",
        a: "Most people bounce through half reps. Lower slowly into a full stretch, pause for a second or two, then rise all the way up, and train them at least twice a week. Genetics play a bigger part with calves than most muscles, but almost everyone has room to grow.",
      },
    ],
  },

  Hamstrings: {
    keyword: "Hamstring workout",
    intro: [
      "The hamstrings do two jobs: they bend the knee and they extend the hip. A complete hamstring workout covers both, with a curl (lying or seated) for knee flexion and a hinge such as the Romanian deadlift or good morning for the hip.",
      "Seated leg curls have the edge for growth because they train the hamstrings in a longer position. Aim for 8 to 16 sets a week, and keep hinges controlled: the hamstrings are the muscle most often strained by rushing the stretch.",
    ],
    picks: [
      { slug: "barbell-romanian-deadlift", why: "The best hip-hinge exercise for hamstring size." },
      { slug: "lever-seated-leg-curl", why: "Trains the hamstrings stretched at the hip, which grows them more than lying curls." },
      { slug: "lever-lying-leg-curl", why: "The classic knee-flexion exercise, easy to progress." },
      { slug: "barbell-good-morning", why: "A hinge that loads the hamstrings and lower back together." },
      { slug: "barbell-straight-leg-deadlift", why: "A stricter, longer-range hinge than the Romanian deadlift." },
      { slug: "dumbbell-lying-hamstring-curl", why: "A curl option when there is no machine." },
    ],
    faqs: [
      {
        q: "Romanian deadlift or leg curl for hamstrings?",
        a: "Both. The Romanian deadlift trains hip extension and the leg curl trains knee flexion, and the hamstrings do both jobs. One of each per week covers them.",
      },
      {
        q: "How do I avoid pulling a hamstring?",
        a: "Warm up with lighter sets, control the lowering on hinges and curls, and build sprinting or explosive work up gradually. Strong hamstrings in the stretched position are the best protection.",
      },
    ],
  },

  Forearms: {
    keyword: "Forearm workout",
    intro: [
      "Forearms get worked by every heavy pull, but grip is usually what fails first. Carries and heavy holds build grip strength; wrist curls and reverse curls add size to the flexors on the inside and the extensors on top.",
      "Two or three short sets of each, two times a week, at the end of a session is enough. High reps and slow lowering suit the forearms well.",
    ],
    picks: [
      { slug: "farmers-walk", why: "Heavy carries for grip, traps and the whole trunk." },
      { slug: "barbell-wrist-curl", why: "Direct size work for the forearm flexors." },
      { slug: "barbell-reverse-curl", why: "Builds the top of the forearm and the brachioradialis." },
      { slug: "dumbbell-reverse-wrist-curl", why: "Balances the flexors and helps elbow health." },
      { slug: "plate-pinch", why: "Pinch grip strength that carries over to holding heavy dumbbells." },
    ],
    faqs: [
      {
        q: "Do I need to train forearms separately?",
        a: "Not always. If your grip holds up on rows and deadlifts, the forearms are getting work. Add direct training if grip is limiting your pulls or you want them bigger.",
      },
    ],
  },
};
