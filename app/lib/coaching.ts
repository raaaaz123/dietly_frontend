/**
 * Hand-authored coaching, merged over the generated catalogue.
 *
 * ## Why this file exists at all
 *
 * `exercises.generated.json` is a snapshot of the published rows, and every
 * one of its 507 entries arrives with empty `overview`, `instructions`, `cues`
 * and `tips` — checked across all 507, not a sample. That is why
 * `isIndexable` currently returns false for the whole catalogue and every
 * detail page renders `noindex, follow`.
 *
 * `npm run fetch:exercises` overwrites the generated file wholesale. So prose
 * cannot live there: the next catalogue refresh would silently delete it, and
 * the pages would drop back out of the index with nothing in the diff to
 * explain why. This file is the overlay that survives that refresh, and
 * `exercises.ts` merges it on top of the snapshot by slug.
 *
 * ## The rule for adding an entry
 *
 * Write it, or leave the slug out. An entry here flips a page from `noindex`
 * to indexable and puts it in the sitemap, so a templated paragraph with the
 * movement's name swapped in does not save work — it publishes a thin page
 * under our own instruction to rank it. That is the specific failure the
 * cluster was gated to avoid.
 *
 * Each entry must carry, in its own words for that specific movement:
 *
 * - `overview` — definition-first and self-contained. A model lifting these
 *   two sentences out of context should still get something correct and
 *   attributable. Name the muscle worked and what the movement is *for*.
 * - `instructions` — at least four steps, in the order a lifter does them,
 *   starting from the setup. Two is the indexability floor; four is the bar
 *   for a page worth reading.
 * - `cues` — what to think about mid-rep, not a restatement of the steps.
 * - `mistakes` — the specific way *this* movement goes wrong, and the fix.
 *   This is the section that earns links and citations, because almost every
 *   competing page omits it.
 *
 * ## Which movements are here
 *
 * The compound lifts and their direct accessories — the movements people
 * actually type into a search box, and the ones the app programs most. The
 * catalogue's long tail of stretches and machine variants stays `noindex`
 * until somebody has a reason to write about it. Coverage is deliberately
 * narrow: a small cluster of genuinely useful pages is worth more than a
 * large one of adequate ones, and the gate is here so that stays true.
 */

export type Coaching = {
  overview: string;
  instructions: string[];
  cues: string[];
  mistakes: string[];
};

export const COACHING: Record<string, Coaching> = {
  "barbell-bench-press": {
    overview:
      "The barbell bench press is a horizontal press that trains the chest, front deltoids and triceps together, and it is the standard measure of upper-body pressing strength. Pressing from a bench rather than standing lets the torso brace against something solid, so the load is limited by what the chest and arms can move rather than by balance.",
    instructions: [
      "Lie back so your eyes sit directly under the bar, and set your feet flat on the floor wide enough to feel stable.",
      "Pull your shoulder blades back and down into the bench and keep them there for the whole set — this is the position that protects the shoulder, not an optional flourish.",
      "Grip the bar a little wider than shoulder width, wrap your thumbs around it, and stack your wrists over your forearms rather than letting the bar sit back in your palms.",
      "Unrack the bar and bring it over your lower chest, then lower it under control until it touches the shirt at roughly nipple height.",
      "Press back up and slightly towards your face, finishing with the bar over your shoulders and your elbows straight but not locked hard.",
    ],
    cues: [
      "Think about pushing yourself away from the bar rather than pushing the bar away from you.",
      "Keep the shoulder blades pinched for the entire set; the moment they flatten, the shoulder takes load the chest should be carrying.",
      "Tuck the elbows to roughly 45 degrees from the torso rather than flaring them straight out to the sides.",
      "Drive through the floor with your feet — leg drive is what keeps the whole torso tight.",
    ],
    mistakes: [
      "Bouncing the bar off the chest. It borrows momentum from the ribcage and removes the hardest part of the rep, which is the part that builds the strength. Touch lightly and press.",
      "Flaring the elbows to 90 degrees. This is the single most common cause of front-shoulder pain in pressing; a 45-degree tuck keeps the joint in a position it can load.",
      "Lifting the hips off the bench to finish a heavy rep. It turns the lift into a steep decline press and tells you the weight is too heavy more honestly than the rep counter does.",
    ],
  },

  "barbell-curl": {
    overview:
      "The barbell curl is the reference biceps exercise: both arms flex against one bar, so the load is heavier than either arm could handle alone and the strength difference between sides cannot hide. It trains the biceps brachii and brachialis through elbow flexion, with no meaningful contribution from anything else when it is done honestly.",
    instructions: [
      "Stand with feet about hip width, holding the bar with an underhand grip at roughly shoulder width, arms hanging straight.",
      "Brace your midsection and pin your upper arms against your sides.",
      "Curl the bar up by bending the elbows only, keeping the upper arms still, until the bar is near the front of your shoulders.",
      "Pause briefly at the top where the biceps are working hardest.",
      "Lower the bar all the way back to straight arms under control, taking longer on the way down than on the way up.",
    ],
    cues: [
      "Keep your elbows pinned to your ribs — if they travel forward, the front deltoid has taken over.",
      "Stop the bar before it reaches your collarbone; past that point the forearm is vertical and the biceps is resting.",
      "Finish every rep at full arm extension. Half reps at the top feel harder and build less.",
    ],
    mistakes: [
      "Swinging the torso to start the rep. Leaning back and heaving turns a biceps exercise into a lower-back exercise; if you need the swing, the bar is too heavy.",
      "Letting the elbows drift forward at the top, which hands the last third of the rep to the shoulder.",
      "Dropping the bar back down. The lowering half is where most of the growth stimulus sits, and releasing it wastes half of every rep.",
    ],
  },

  "barbell-romanian-deadlift": {
    overview:
      "The Romanian deadlift is a hip hinge that loads the hamstrings and glutes through a long stretch, with the knees held in a fixed soft bend throughout. It differs from a conventional deadlift in that the bar starts at the top and never returns to the floor, which keeps constant tension on the hamstrings for the whole set.",
    instructions: [
      "Stand holding the bar at the top of a deadlift, feet hip width, bar against your thighs.",
      "Soften your knees to a slight bend and then stop bending them — that angle stays fixed for every rep.",
      "Push your hips backwards and let the bar slide down the front of your legs, keeping it in contact with your skin the whole way.",
      "Keep lowering until you feel a strong stretch in the back of your thighs, usually somewhere between mid-shin and just below the knee.",
      "Drive your hips forwards to stand back up, squeezing the glutes at the top without leaning back past straight.",
    ],
    cues: [
      "The movement is hips backwards, not chest downwards — the bar falls because your hips moved, not because you bent over.",
      "Keep the bar touching your legs; every inch it drifts forward multiplies the load on your lower back.",
      "Let the hamstring stretch set your depth, not a number. Going lower than your hamstrings allow just rounds your spine.",
    ],
    mistakes: [
      "Turning it into a squat by bending the knees as you descend. The knees setting and holding one angle is the entire distinction between this and a deadlift.",
      "Chasing depth until the lower back rounds. The stretch should be felt in the hamstrings; once the back rounds, the hamstrings have stopped lengthening and the spine is taking the difference.",
      "Hyperextending at the top. Standing up is the end of the rep; leaning backwards past upright loads the lumbar spine for no added benefit.",
    ],
  },

  "barbell-hip-thrust": {
    overview:
      "The barbell hip thrust loads hip extension with the back supported on a bench, which puts the glutes under their heaviest tension at the top of the movement rather than at the bottom. That top-end loading is what separates it from squats and deadlifts, where the glutes are working hardest in the stretched position.",
    instructions: [
      "Sit on the floor with your upper back against the long edge of a bench and the barbell across your hips, padded.",
      "Set your feet flat, about shoulder width, close enough that your shins finish vertical at the top of the rep.",
      "Tuck your chin slightly and keep it tucked — your gaze travels with your hips rather than staying fixed on the ceiling.",
      "Drive through your heels and push your hips up until your torso and thighs form a straight line.",
      "Squeeze the glutes hard at the top for a beat, then lower under control until the bar is just short of the floor.",
    ],
    cues: [
      "Finish the rep with your ribs down, not with your lower back arched — the range should come from the hips.",
      "Push the floor away through your heels; pushing through the toes shifts the work to the quads.",
      "Aim for a flat torso at the top, not the highest hips you can reach.",
    ],
    mistakes: [
      "Arching the lower back to fake the last few degrees of range. It reads as a bigger rep and loads the spine instead of the glutes; keeping the chin tucked mostly prevents it.",
      "Placing the feet too far away, which turns the exercise into a hamstring movement and often causes cramping.",
      "Skipping the pause at the top. The top is the only position where the glutes are fully loaded, so rushing through it removes the reason to do the exercise.",
    ],
  },

  "arnold-press": {
    overview:
      "The Arnold press is a dumbbell overhead press that begins with the palms facing the body and rotates them outwards as the weight goes up. The rotation adds the front deltoid's internal-to-external range to a standard press, so the shoulder works through more of its available motion than a fixed-grip press allows.",
    instructions: [
      "Sit or stand holding two dumbbells at shoulder height, palms facing you, elbows in front of your ribs.",
      "Press the dumbbells upward and rotate your palms outwards as they rise.",
      "Finish with the arms overhead, palms facing forwards and the dumbbells roughly over your shoulder joints.",
      "Reverse the path exactly: lower and rotate the palms back towards you at the same time.",
      "Return to the start with the palms facing your body before beginning the next rep.",
    ],
    cues: [
      "Let the rotation happen across the whole press rather than twisting at the top.",
      "Keep your ribs down and your midsection braced so the press does not become a standing back arch.",
      "Stop the dumbbells over your shoulders, not behind your head.",
    ],
    mistakes: [
      "Using a load that only works with a leg drive. This is a shoulder exercise; if the knees are dipping, it has become a push press.",
      "Rotating the wrists only at the very top, which skips the range the exercise exists to add.",
      "Flaring into a deep stretch at the bottom under heavy weight. The start position is at shoulder height, not below it.",
    ],
  },

  "archer-pull-up": {
    overview:
      "The archer pull-up is a bodyweight pulling exercise that shifts most of the load onto one arm at a time by keeping the other arm straight out to the side. It trains the lats and biceps close to the demand of a one-arm pull-up while the extended arm supplies just enough assistance to make the rep completable.",
    instructions: [
      "Hang from a bar with a grip considerably wider than shoulder width, palms facing forwards.",
      "Pull yourself up towards one hand, keeping the opposite arm straight as it slides along the bar.",
      "Bring your chin up beside the working hand, with most of your weight over that shoulder.",
      "Lower under control back to a full hang.",
      "Alternate the working side each rep so both arms get the same volume.",
    ],
    cues: [
      "Pull your elbow down towards your hip rather than thinking about lifting your chin.",
      "Keep the straight arm genuinely straight — bending it turns the set back into an ordinary pull-up.",
      "Start each rep from a dead hang with the shoulder blades set, not from a shrug.",
    ],
    mistakes: [
      "Kipping the hips to get up. It hides the strength gap this exercise exists to close.",
      "Letting the straight arm bend progressively through the set, which quietly redistributes the load back to both arms as you fatigue.",
      "Attempting it before you can do around eight clean strict pull-ups; below that the reps become swings rather than pulls.",
    ],
  },

  "archer-push-up": {
    overview:
      "The archer push-up is a bodyweight pressing exercise that loads one arm at a time by extending the other arm straight out to the side. It is the standard intermediate step between a regular push-up and a one-arm push-up, training the chest and triceps of the working side under close to bodyweight load without needing any equipment.",
    instructions: [
      "Set up in a push-up position with your hands considerably wider than shoulder width.",
      "Lower yourself towards one hand, bending that elbow while the opposite arm stays straight.",
      "Descend until the shoulder of the working arm is close to the level of that hand.",
      "Press back up through the working arm to the starting position.",
      "Alternate sides each rep, keeping your hips square to the floor throughout.",
    ],
    cues: [
      "Keep your body in one line from head to heels; the hips sagging is the first sign the set is over.",
      "Turn the straight arm's palm slightly outwards to keep that shoulder comfortable.",
      "Move your chest towards the working hand rather than just dropping your head towards it.",
    ],
    mistakes: [
      "Letting the hips rotate towards the working arm, which reduces the load and stops the exercise transferring to a one-arm push-up.",
      "Bending the extended arm, which turns the movement into a wide push-up.",
      "Dropping the head towards the hand to fake depth while the chest stays high, which shortens the range exactly where the working arm would otherwise be loaded.",
    ],
  },

  "assisted-triceps-dip": {
    overview:
      "The assisted triceps dip is a vertical pressing exercise performed on parallel bars with a machine or band supporting part of your bodyweight. It trains the triceps, lower chest and front deltoids, and the assistance lets you train the movement with full range and clean form before you can handle your whole bodyweight.",
    instructions: [
      "Set the assistance so you can complete around eight to ten controlled reps, then take the handles or place your knees on the pad.",
      "Start at the top with your arms straight, shoulders pulled down away from your ears.",
      "Keep your torso close to upright and your elbows pointing backwards to bias the triceps.",
      "Lower yourself until your elbows reach roughly 90 degrees.",
      "Press back up to straight arms without letting your shoulders shrug up at the top.",
    ],
    cues: [
      "Keep the shoulders pulled down throughout; shrugging at the bottom is what makes dips uncomfortable.",
      "Stay upright for triceps emphasis, or lean the torso forwards to shift the work to the chest.",
      "Reduce the assistance gradually week to week rather than jumping to unassisted.",
    ],
    mistakes: [
      "Descending too deep. Going far past 90 degrees puts the shoulder in a stretched, internally rotated position under load, which is where dips earn their reputation.",
      "Setting the assistance so high that the set never becomes hard, which makes the exercise a warm-up rather than training.",
      "Bouncing out of the bottom rather than pressing out of it, which loads the shoulder capsule with a rebound at the one point in the rep where it is least able to take it.",
    ],
  },

  "alternate-biceps-curl": {
    overview:
      "The alternating dumbbell curl trains one arm at a time while the other holds its dumbbell at the bottom. Working one side at a time means each arm has to produce its own force, so a strength or size difference between sides is trained directly rather than being masked by the stronger arm.",
    instructions: [
      "Stand with a dumbbell in each hand, arms hanging straight, palms facing your thighs.",
      "Curl one dumbbell up, rotating your palm to face your shoulder as it rises.",
      "Pause briefly at the top with the biceps fully shortened.",
      "Lower that dumbbell under control all the way to straight.",
      "Repeat on the other side, alternating arms until the set is finished.",
    ],
    cues: [
      "Keep the resting arm still — letting it swing gives the working arm momentum to borrow.",
      "Rotate the palm as you lift rather than starting the rep already turned.",
      "Keep both elbows against your sides for the whole set.",
    ],
    mistakes: [
      "Rocking the torso side to side in rhythm with the arms, which is the most common way this exercise turns into a whole-body movement.",
      "Cutting the lowering phase short to start the next arm sooner.",
      "Choosing the weight for your stronger arm, which quietly widens the imbalance the exercise is good at fixing.",
    ],
  },

  "assisted-sit-up": {
    overview:
      "The assisted sit-up is a trunk flexion exercise performed with the feet anchored or held, which lets the hip flexors help the abdominals complete the range. It trains the rectus abdominis, and the assistance makes a full sit-up achievable for someone who cannot yet do one unsupported.",
    instructions: [
      "Lie on your back with your knees bent and your feet anchored under a pad or held by a partner.",
      "Cross your arms over your chest, or rest your fingertips lightly beside your ears without pulling.",
      "Curl your head and shoulders off the floor first, rolling up one vertebra at a time.",
      "Continue up until your torso is close to your thighs.",
      "Lower back down with the same rolling motion, resisting the descent rather than dropping.",
    ],
    cues: [
      "Start each rep by curling the spine, not by hinging at the hips.",
      "Keep your chin in a neutral position — a fist's gap between chin and chest is about right.",
      "Breathe out as you rise; holding your breath is what makes the neck strain.",
    ],
    mistakes: [
      "Pulling on the back of the head with the hands, which strains the neck and does nothing for the abdominals.",
      "Hinging straight up with a flat back, which makes the set almost entirely hip flexor work.",
      "Dropping back down under gravity, discarding the half of the rep that the abdominals control.",
    ],
  },
  "barbell-squat": {
    overview:
      "The barbell back squat is a knee-and-hip extension exercise with the bar resting across the upper back, and it is the reference lower-body strength lift. It trains the quadriceps, glutes and adductors under load while the whole trunk works to keep the spine rigid, which is why it carries over to almost everything else done on two feet.",
    instructions: [
      "Set the bar in the rack at roughly mid-chest height, step under it, and rest it across the muscle at the top of your back rather than on your neck.",
      "Grip the bar firmly, pull your elbows down and your upper back tight, then stand up to unrack it and take two steps back.",
      "Set your feet about shoulder width with your toes turned slightly out, and take a deep breath into your midsection to brace.",
      "Sit down and slightly back, letting your knees travel forwards over your feet and your hips drop between your heels.",
      "Descend until the crease of your hip is at least level with the top of your knee, then drive back up through your whole foot, keeping the bar over the middle of your feet the whole way.",
    ],
    cues: [
      "Spread the floor with your feet — actively screwing them outwards stops the knees collapsing inwards.",
      "Keep your chest proud and your ribs down at the same time; the brace is what holds those together.",
      "Think about driving your upper back into the bar out of the bottom, not about standing up.",
      "Breathe in at the top, hold it for the rep, and breathe out at the top of the next one.",
    ],
    mistakes: [
      "Letting the knees cave inwards on the way up. It is almost always a bracing and foot-pressure problem rather than a weak-glutes problem, and spreading the floor fixes it faster than a band does.",
      "Cutting depth to add weight. A partial squat trains a partial range; if depth disappears as the bar gets heavier, the useful working weight is the one where it does not.",
      "The hips shooting up faster than the shoulders, which turns the squat into a bent-over good morning and moves the load onto the lower back.",
    ],
  },

  "barbell-deadlift": {
    overview:
      "The barbell deadlift is a hip hinge that lifts a loaded bar from the floor to a standing position, and it moves more absolute weight than any other common lift. It trains the glutes, hamstrings, the whole back and the grip simultaneously, and unlike most exercises it starts from a dead stop with no stretch to rebound out of.",
    instructions: [
      "Stand with the bar over the middle of your feet, feet about hip width, shins roughly an inch from the bar.",
      "Hinge at the hips and bend your knees to reach the bar, taking a grip just outside your legs.",
      "Pull your chest up and take the slack out of the bar — you should hear it settle against the plates before anything moves.",
      "Push the floor away with your legs, keeping the bar dragging lightly up your shins.",
      "Once the bar passes your knees, drive your hips forwards to finish standing tall, then reverse the path to return it to the floor under control.",
    ],
    cues: [
      "Push the floor away rather than pulling the bar up; the first half of the lift is a leg press.",
      "Keep the bar touching your legs the entire way — any gap is leverage working against your lower back.",
      "Set the back flat before the bar moves, and keep that shape for the whole rep.",
      "Finish by standing up straight, not by leaning back.",
    ],
    mistakes: [
      "Jerking the bar off the floor. Yanking a loaded bar from slack is how backs get hurt; taking the slack out first means the lift starts against tension rather than against nothing.",
      "Rounding the lower back under load, which is the difference between a hard lift and an injury.",
      "Letting the bar drift forwards away from the shins, which lengthens the lever arm on the spine at exactly the wrong moment.",
      "Hyperextending at the top to signal a finished rep — the lockout is upright, not leaning backwards.",
    ],
  },

  "barbell-bent-over-row": {
    overview:
      "The barbell bent-over row is a horizontal pulling exercise performed with the torso hinged forwards, pulling the bar to the abdomen. It trains the lats, rhomboids, rear deltoids and biceps, and it is the standard counterbalance to bench pressing because it loads the back in the same plane the bench press loads the chest.",
    instructions: [
      "Stand holding the bar with an overhand grip a little wider than shoulder width, feet hip width apart.",
      "Push your hips back and hinge forwards until your torso is somewhere between 45 degrees and parallel to the floor, keeping your back flat.",
      "Let the bar hang at arm's length and set your shoulder blades down.",
      "Pull the bar towards your lower ribs or upper abdomen, leading with the elbows.",
      "Lower it back to straight arms under control without letting your torso rise to meet it.",
    ],
    cues: [
      "Pull your elbows back past your ribs rather than thinking about moving your hands.",
      "Hold the torso angle constant — the hinge is a position, not part of the rep.",
      "Squeeze the shoulder blades together at the top, then let them travel apart at the bottom.",
    ],
    mistakes: [
      "Standing up a little on every rep. It uses the hips to throw the bar and is the most common way this exercise quietly becomes a partial deadlift.",
      "Rowing to the chest instead of the abdomen, which turns a lat exercise into a rear-deltoid exercise.",
      "Rounding the back as the set gets hard, which is the cue to stop the set rather than to grind out two more.",
    ],
  },

  "barbell-front-squat": {
    overview:
      "The barbell front squat holds the bar across the front of the shoulders rather than the upper back, which forces the torso to stay much more upright than a back squat. That upright position shifts load towards the quadriceps and demands far more from the upper back, so it usually trains at a lighter weight than a back squat for the same effort.",
    instructions: [
      "Set the bar at mid-chest height and step under it so it rests on the front of your shoulders, not on your hands.",
      "Take a front rack position: fingers under the bar just outside shoulder width, elbows driven high so your upper arms are close to parallel with the floor.",
      "Stand up to unrack, step back, and set your feet about shoulder width with toes slightly out.",
      "Brace hard, then squat straight down, keeping your torso as upright as you can and letting your knees travel forwards.",
      "Descend to at least parallel, then drive up through your whole foot while keeping the elbows high.",
    ],
    cues: [
      "Elbows up is the whole lift — the moment they drop, the bar rolls forwards and the rep is lost.",
      "Let the knees go forwards; restricting them here just tips you into a back squat.",
      "Keep the bar resting on the shoulders and the fingers loose underneath, not gripping.",
    ],
    mistakes: [
      "Trying to hold the bar in the hands like a curl. The shoulders carry the bar; the fingers only stop it rolling.",
      "Letting the elbows drop as fatigue sets in, which rounds the upper back and dumps the bar forwards.",
      "Loading it like a back squat. The front squat is limited by the upper back and the rack position long before the legs run out.",
    ],
  },

  "barbell-incline-bench-press": {
    overview:
      "The incline barbell bench press is a bench press performed on a bench set to roughly 30 to 45 degrees, which biases the load towards the upper portion of the chest and the front deltoids. The steeper the bench, the more the front deltoid takes over, which is why most people work nearer 30 degrees than 45.",
    instructions: [
      "Set the bench to about 30 degrees and lie back with your feet flat on the floor.",
      "Retract your shoulder blades into the bench and keep them there throughout the set.",
      "Grip the bar slightly wider than shoulder width and unrack it over your upper chest.",
      "Lower the bar under control until it touches near your collarbone, keeping your elbows tucked to about 45 degrees.",
      "Press back up to straight arms over your shoulders.",
    ],
    cues: [
      "Touch higher on the chest than you would on a flat bench — the bar path follows the angle.",
      "Keep the shoulder blades pinned; on an incline the temptation to let them roll forwards is stronger.",
      "Keep the feet planted and the glutes on the bench.",
    ],
    mistakes: [
      "Setting the bench too steep. Past about 45 degrees it is effectively a shoulder press, and the upper chest stops being the limiting muscle.",
      "Flaring the elbows wide, which loads the front of the shoulder in its least stable position.",
      "Expecting flat-bench numbers. The incline moves less weight for everyone, and chasing the flat-bench load is how form goes first.",
    ],
  },

  "cable-pulldown": {
    overview:
      "The cable pulldown is a vertical pulling exercise that draws a bar down to the upper chest from an overhead cable. It trains the lats, teres major and biceps through the same movement pattern as a pull-up, with the advantage that the load can be set below bodyweight and increased in small steps.",
    instructions: [
      "Set the thigh pad so your legs are held down firmly, and take a grip on the bar somewhat wider than shoulder width.",
      "Sit down with your arms extended overhead and let your shoulder blades rise with the weight.",
      "Lean your torso back very slightly and set your chest up.",
      "Pull the bar down towards your upper chest by driving your elbows down and back.",
      "Let the bar rise back to full extension under control, allowing the shoulder blades to travel up again at the top.",
    ],
    cues: [
      "Think about pulling your elbows into your back pockets, not about pulling the bar down.",
      "Start each rep from a full stretch with the shoulder blades elevated — that range is where the lats do the most work.",
      "Keep the torso still; the lean is a position, not part of the rep.",
    ],
    mistakes: [
      "Pulling the bar behind the neck. It offers nothing a front pulldown does not and forces the shoulder into an extreme externally rotated position under load.",
      "Leaning back progressively through the set until it becomes a seated row.",
      "Stopping short of full extension at the top, which cuts out the stretched position and most of the reason to do the exercise.",
    ],
  },
};

/** Slugs with authored coaching. Used only for tests and reporting. */
export const COACHED_SLUGS = Object.keys(COACHING);
