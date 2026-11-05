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

  // Second batch (2026-11-05): the movements the muscle hubs rank as "best",
  // most of which only arrived when the snapshot grew from 507 rows (names
  // A to C) to the full 1,886-row catalogue.

  "pull-up": {
    overview:
      "The pull-up is a bodyweight vertical pull: you hang from a bar with an overhand grip and pull your chin over it. It trains the lats, teres major, rear delts and biceps, and it is the most widely used test of upper-body pulling strength relative to bodyweight.",
    instructions: [
      "Grip the bar overhand, hands a little wider than shoulder width, and hang with your arms straight.",
      "Set your shoulders by pulling them slightly down and away from your ears, and squeeze your glutes so your legs stay still.",
      "Pull your elbows down towards your ribs until your chin clears the bar.",
      "Lower yourself under control all the way to a straight-arm hang before the next rep.",
    ],
    cues: [
      "Drive your elbows down into your back pockets rather than pulling with your hands.",
      "Lead with your chest towards the bar, not your chin.",
      "Take two seconds on the way down; the lowering builds strength too.",
    ],
    mistakes: [
      "Half reps that stop short of a straight-arm hang. The bottom range is where the lats are stretched and do the most work.",
      "Kicking and swinging to get the chin over. If you cannot do clean reps, use a band, the assisted machine or slow negatives.",
      "Shrugging up at the start, which puts the load on the upper traps and the front of the shoulder.",
    ],
  },

  "chin-up": {
    overview:
      "The chin-up is a vertical pull done with an underhand, shoulder-width grip. Compared with the pull-up it brings the biceps in much more, so most people can do a few more reps, and it is one of the best compound exercises for both the lats and the arms.",
    instructions: [
      "Grip the bar with your palms facing you, hands about shoulder width apart, and hang with straight arms.",
      "Brace your trunk and keep your legs still, either straight or with ankles crossed.",
      "Pull until your chin is over the bar, keeping your elbows in front of your body.",
      "Lower yourself slowly, over about two seconds, all the way to a full straight-arm hang.",
    ],
    cues: [
      "Squeeze the bar hard; a strong grip makes the whole pull feel stronger.",
      "Keep the ribs down so you do not arch into the rep.",
      "Pull the bar to your upper chest if you can, not just the chin.",
    ],
    mistakes: [
      "Craning the neck to get the chin over. The rep counts when the body rises, not the chin.",
      "Dropping fast from the top, which wastes the eccentric and strains the elbows.",
      "A grip so narrow the wrists bend. Shoulder width keeps the forearms straight.",
    ],
  },

  "cable-wide-grip-lat-pulldown": {
    overview:
      "The wide-grip lat pulldown is a seated cable exercise that pulls a long bar from overhead down to the upper chest. It trains the same lats, teres major and biceps as a pull-up, but the load can be set below bodyweight, which makes it the standard way to build up to pull-ups.",
    instructions: [
      "Adjust the thigh pad so your legs are locked in, and grip the bar overhand about one and a half times shoulder width.",
      "Sit with your arms straight overhead and lean back no more than 10 to 15 degrees.",
      "Pull the bar to your upper chest by bringing your elbows down and slightly back.",
      "Let it rise under control until your arms are straight and your shoulders lift slightly.",
    ],
    cues: [
      "Think of pulling your elbows to your hips.",
      "Keep the chest up to meet the bar.",
      "Let the shoulder blades rise at the top of every rep for the full stretch.",
    ],
    mistakes: [
      "Pulling the bar behind the neck. It adds shoulder stress and no extra lat work.",
      "Leaning far back and rowing the weight down, which turns it into a different exercise.",
      "Using so much weight that the reps stop halfway. Full range at a lower weight builds more.",
    ],
  },

  "cable-seated-row": {
    overview:
      "The seated cable row pulls a handle towards your torso from a low cable while you sit with your feet braced. It trains the mid back (rhomboids and mid traps), the lats and the rear delts, and because your chest stays upright and supported by your legs, it is easy to take close to failure safely.",
    instructions: [
      "Sit with your feet on the platform, knees slightly bent, and take the handle with your arms straight.",
      "Sit tall so your torso is close to vertical, with a neutral lower back.",
      "Pull the handle to your lower ribs, driving your elbows back past your torso.",
      "Squeeze your shoulder blades together for a moment, then let your arms extend and your shoulders reach forward.",
    ],
    cues: [
      "Chest tall, as if someone is pulling a string from your sternum.",
      "Elbows travel back, not up.",
      "Reach forward with the shoulders at the end of every rep for the stretch.",
    ],
    mistakes: [
      "Rocking the torso back and forth so the lower back does the lifting.",
      "Shrugging the shoulders up towards the ears as the handle comes in.",
      "Cutting the rep short at the front, which removes the stretch the mid back responds to.",
    ],
  },

  "dumbbell-bench-press": {
    overview:
      "The dumbbell bench press is a flat-bench press with a dumbbell in each hand. It trains the chest, front delts and triceps like the barbell version, with a deeper stretch at the bottom and each side working on its own, which helps even out a stronger and weaker side.",
    instructions: [
      "Sit on the end of the bench with the dumbbells on your thighs, then lie back and kick them up to your chest.",
      "Pull your shoulder blades back and down, plant your feet and press the weights up over your chest.",
      "Lower the dumbbells to the sides of your chest, elbows about 45 degrees from your torso, until you feel a stretch.",
      "Press back up, letting the dumbbells come slightly together at the top.",
    ],
    cues: [
      "Keep your forearms vertical under the weights the whole time.",
      "Press up and slightly in, as if pushing the dumbbells towards each other.",
      "Stay tight in the upper back between reps.",
    ],
    mistakes: [
      "Clanging the weights together at the top, which takes tension off the chest.",
      "Flaring the elbows to 90 degrees, the most common cause of shoulder pain in pressing.",
      "Dropping the dumbbells to the floor at the end of a heavy set. Bring them to your chest and sit up, or lower them with control.",
    ],
  },

  "dumbbell-incline-bench-press": {
    overview:
      "The incline dumbbell press is done on a bench set to about 30 to 45 degrees. The incline shifts the work towards the upper (clavicular) chest and the front delts, the part of the chest most physiques lack, and dumbbells let the shoulders move in a natural path.",
    instructions: [
      "Set the bench to 30 to 45 degrees, sit back with the dumbbells on your thighs and kick them up to your shoulders.",
      "Set your shoulder blades back and down against the bench.",
      "Press the dumbbells up over your upper chest until your arms are straight.",
      "Lower them slowly to the sides of the upper chest, elbows a little below the shoulders.",
    ],
    cues: [
      "Keep a slight arch, but keep your hips on the bench.",
      "Lower until the upper chest stretches, not just until the elbows bend.",
      "Press up in line with your collarbones.",
    ],
    mistakes: [
      "A bench set too steep. Above about 45 degrees the shoulders take over from the chest.",
      "Short reps that stop at 90 degrees of elbow bend. The upper chest grows from the stretch at the bottom, so lower until you feel it.",
      "Expecting flat-bench weights. Most people press about 15 to 20% less on an incline.",
    ],
  },

  "chest-dip": {
    overview:
      "The chest dip is a bodyweight press between parallel bars with the torso leaning forward. The lean shifts the work from the triceps to the lower chest, and the deep bottom position loads the pecs hard in a stretch, which makes dips one of the best chest builders that needs no bench.",
    instructions: [
      "Grip the bars and jump or step up to straight arms, shoulders over your hands.",
      "Lean your torso forward about 30 degrees and bend your knees slightly.",
      "Lower yourself by bending your elbows until your shoulders are just below your elbows.",
      "Press back up to straight arms, keeping the forward lean.",
    ],
    cues: [
      "Chest over the hands, not hips under them.",
      "Let the elbows flare slightly to bias the chest.",
      "Control the bottom; do not bounce out of it.",
    ],
    mistakes: [
      "Going deeper than your shoulders tolerate. Stop when the shoulder is level with or just below the elbow.",
      "Staying bolt upright, which turns it into a triceps dip. Lean forward and let the chest travel over the hands.",
      "Shrugging up into the ears at the bottom. Keep the shoulders pushed down.",
    ],
  },

  "cable-standing-fly": {
    overview:
      "The standing cable fly brings two cable handles together in front of the chest in a hugging arc. It isolates the chest without the triceps, and because the cable keeps pulling at every point of the range, the pecs stay under tension all the way to the squeeze, where dumbbell flyes go slack.",
    instructions: [
      "Set both pulleys at shoulder height or a little above, take a handle in each hand and step forward into a split stance.",
      "Start with your arms open to the sides, elbows slightly bent and fixed.",
      "Bring the handles together in a wide arc until they meet in front of your chest.",
      "Open back out slowly until you feel a stretch across the chest.",
    ],
    cues: [
      "Hug a big tree; the elbows do not bend or straighten during the rep.",
      "Lead with the biceps, not the hands.",
      "Pause for a second when the handles meet.",
    ],
    mistakes: [
      "Turning it into a press by bending and straightening the elbows.",
      "Going so heavy the shoulders roll forward at the front, which hands the work to the front delts. Drop the weight and keep the chest up.",
      "Stretching so far back that the front of the shoulder aches. A stretch in the chest is the limit.",
    ],
  },

  "barbell-standing-military-press": {
    overview:
      "The standing military press, or overhead press, pushes a barbell from the front of the shoulders to overhead. It trains the front and side delts and the triceps, and because you stand, it also demands a braced trunk and glutes. It is the main strength lift for the shoulders.",
    instructions: [
      "Unrack the bar at collarbone height with a grip just outside your shoulders and your elbows slightly in front of the bar.",
      "Stand with your feet hip-width apart, squeeze your glutes and brace your abs.",
      "Press the bar straight up, moving your head back a little so the bar clears your chin.",
      "Once it passes your forehead, bring your head through so the bar finishes over your shoulders and mid-foot.",
      "Lower it under control to the collarbones.",
    ],
    cues: [
      "Squeeze the glutes and keep the ribs down; no leaning back.",
      "Bar path straight up, head moves out of the way.",
      "Finish with the biceps by your ears.",
    ],
    mistakes: [
      "Leaning back into a standing incline press, which loads the lower back.",
      "Pressing the bar forward around the face instead of moving the head back.",
      "Flared elbows at the start, which leaks power. Start with the forearms vertical.",
    ],
  },

  "dumbbell-lateral-raise": {
    overview:
      "The dumbbell lateral raise lifts a pair of dumbbells out to the sides to shoulder height. It is the most direct exercise for the side delts, the head that makes the shoulders look wide, and it works best with light weights, strict form and high reps.",
    instructions: [
      "Stand holding a dumbbell in each hand at your sides, with a slight bend in the elbows.",
      "Lean forward a few degrees from the hips.",
      "Raise the dumbbells out to your sides until your arms are about parallel with the floor.",
      "Lower them slowly back to your sides, taking two to three seconds on the way down.",
    ],
    cues: [
      "Lead with the elbows and think of pushing the weights out to the walls, not up.",
      "Keep the hands at or below elbow height at the top.",
      "Take two to three seconds on the way down.",
    ],
    mistakes: [
      "Swinging heavy weights up with the hips and traps. Most people need a much lighter dumbbell than they expect.",
      "Shrugging as you lift, which moves the work to the upper traps. Keep the shoulders down and away from the ears.",
      "Raising far above shoulder height, which adds little side-delt work and can pinch the shoulder.",
    ],
  },

  "band-face-pull": {
    overview:
      "The face pull pulls a band or rope towards your face with the elbows high and the hands finishing beside your ears. It trains the rear delts, mid traps and the rotator cuff together, which balances the pressing most programs are full of and helps keep the shoulders healthy.",
    instructions: [
      "Anchor the band at face height, grip it with your palms facing down and step back until it is taut.",
      "Stand tall with your arms straight in front of you.",
      "Pull the band towards your face, elbows high and wide.",
      "At the end, rotate your hands back so they finish beside your ears, then return under control.",
    ],
    cues: [
      "Elbows at shoulder height or higher.",
      "Finish like a double-biceps pose.",
      "Pause at the back for a second.",
    ],
    mistakes: [
      "Pulling to the chest with low elbows, which turns it into a row and skips the rear delts. Keep the elbows at shoulder height.",
      "Leaning back to move more resistance, so the lower back and bodyweight do the pulling. Step closer to the anchor instead.",
      "Skipping the rotation at the end, which is the part that trains the rotator cuff.",
    ],
  },

  "sled-45-degrees-leg-press": {
    overview:
      "The 45-degree leg press pushes a weighted sled up an angled track with your feet while you lie back in a seat. It trains the quads and glutes heavily without balance or the lower back limiting the set, which makes it one of the best ways to take the legs close to failure safely.",
    instructions: [
      "Sit with your back and hips flat against the pad and place your feet shoulder-width apart in the middle of the platform.",
      "Press the platform up and release the safety handles.",
      "Lower the sled by bending your knees towards your chest until your thighs are close to your torso, while your lower back stays on the pad.",
      "Press back up through your whole foot, stopping just short of locking the knees.",
    ],
    cues: [
      "Knees track over the toes, not inward.",
      "Hips stay glued to the seat.",
      "Push through the mid-foot and heel.",
    ],
    mistakes: [
      "Going so deep that the hips roll off the pad, which rounds the lower back under heavy load.",
      "Locking the knees hard at the top, which puts a heavy sled on the joint. Stop just short of straight and keep the tension on the quads.",
      "Loading the sled with plates and doing quarter reps. A full range with less weight grows more muscle.",
    ],
  },

  "bulgarian-split-squat": {
    overview:
      "The Bulgarian split squat is a single-leg squat with the back foot raised on a bench. It trains the quads and glutes of the front leg through a deep range, needs very little weight to be hard, and exposes the strength difference between your left and right sides.",
    instructions: [
      "Stand about two feet in front of a bench and rest the top of your back foot on it.",
      "Keep most of your weight on the front foot, with your torso tall or leaning slightly forward.",
      "Lower straight down until your front thigh is about parallel to the floor and your back knee is near the ground.",
      "Drive up through the front foot to the start.",
    ],
    cues: [
      "Down, not forward: the back knee drops towards the floor.",
      "Front knee follows the line of the toes.",
      "Lean forward a little more to bias the glutes, stay upright for the quads.",
    ],
    mistakes: [
      "Standing too close to the bench, which pushes the front knee far forward and cramps the hip.",
      "Pushing off the back foot, which steals the work from the front leg. The back foot is there for balance only.",
      "Starting with the weaker leg last. Start with it, and match its reps on the strong side.",
    ],
  },

  "dumbbell-goblet-squat": {
    overview:
      "The goblet squat is a squat holding one dumbbell vertically against your chest. The weight in front acts as a counterbalance, which makes an upright, deep squat easy to learn, so it is the best first squat for beginners and a useful high-rep finisher for everyone else.",
    instructions: [
      "Hold one end of a dumbbell in both hands at your chest, elbows pointing down.",
      "Stand with your feet a little wider than your hips and your toes turned out slightly.",
      "Sit down between your heels, keeping your chest up, until your elbows reach the inside of your knees.",
      "Stand back up by driving through the whole foot.",
    ],
    cues: [
      "Elbows inside the knees at the bottom.",
      "Keep the dumbbell touching the chest.",
      "Spread the floor with your feet.",
    ],
    mistakes: [
      "Letting the dumbbell drift away from the chest, which tips you forward.",
      "Heels rising at the bottom. Widen the stance or turn the toes out more.",
      "Stopping above parallel when there is no reason to. The goblet squat makes depth easy; use it.",
    ],
  },

  "lever-leg-extension": {
    overview:
      "The leg extension is a seated machine exercise that straightens the knee against a padded lever. It isolates the quadriceps, including the rectus femoris that squats train less, and it is the only common exercise that works the quads fully in their shortened position.",
    instructions: [
      "Adjust the seat so your knees line up with the machine's pivot, and the pad sits on your lower shins.",
      "Hold the handles and sit back firmly against the seat.",
      "Straighten your legs until your knees are fully extended.",
      "Hold for a moment, then lower slowly until your knees are bent past 90 degrees.",
    ],
    cues: [
      "Squeeze the quads hard at the top.",
      "Hips stay down on the seat.",
      "Lower for two or three seconds.",
    ],
    mistakes: [
      "Kicking the weight up, which swaps quad work for momentum and jolts the knee. Lift for a second, lower for two or three.",
      "A seat set wrong, so the knee does not line up with the pivot. It is the setup detail that makes the exercise comfortable.",
      "Partial reps at the top only. Use the full range unless a knee injury says otherwise.",
    ],
  },

  "lever-seated-leg-curl": {
    overview:
      "The seated leg curl bends the knee against a padded lever while you sit upright. It isolates the hamstrings, and because the hips are bent, the hamstrings work from a longer, stretched position than in a lying curl, which has been shown to build more hamstring muscle.",
    instructions: [
      "Sit with the back of your knees at the edge of the seat and your knees aligned with the machine's pivot.",
      "Lower the thigh pad so it holds your legs firmly, and set the shin pad just above your heels.",
      "Curl your heels down and back as far as they go.",
      "Let the pad rise slowly until your legs are almost straight.",
    ],
    cues: [
      "Lean the torso slightly forward to stretch the hamstrings more.",
      "Point the toes up towards the shins.",
      "Control the return; do not let the stack pull your legs up.",
    ],
    mistakes: [
      "A loose thigh pad, which lets the hips lift and cheat the rep.",
      "Stopping before full knee flexion, which cuts the hardest part of the curl. Curl until the heels are under the seat.",
      "Rushing the return, the part of the rep that grows the hamstrings in the stretch.",
    ],
  },

  "dumbbell-hammer-curl": {
    overview:
      "The hammer curl is a dumbbell curl with the palms facing each other. The neutral grip shifts work to the brachialis, which sits under the biceps, and to the brachioradialis in the forearm. Both add thickness to the arm, and most people can hammer curl more weight than a regular curl.",
    instructions: [
      "Stand holding a dumbbell in each hand at your sides, palms facing your thighs.",
      "Keep your upper arms pinned to your sides.",
      "Curl the dumbbells up, keeping the palms facing in, until your forearms are close to vertical.",
      "Lower the dumbbells slowly, over two or three seconds, to fully straight arms.",
    ],
    cues: [
      "Thumbs lead the way up.",
      "Elbows stay at your sides.",
      "Squeeze the handle hard for more forearm work.",
    ],
    mistakes: [
      "Swinging the torso to start the curl, which lets the hips and lower back lift the weight. Stand against a wall if you cannot stop it.",
      "Elbows drifting forward at the top, which takes tension off the arm.",
      "Half reps that never reach a straight arm, which skip the stretched range where the arm grows. Lower all the way every time.",
    ],
  },

  "dumbbell-incline-curl": {
    overview:
      "The incline dumbbell curl is done lying back on an incline bench with the arms hanging behind the body. That position stretches the long head of the biceps before the curl begins, and training a muscle in the stretch is one of the most reliable ways to make it grow.",
    instructions: [
      "Set a bench to about 45 to 60 degrees and lie back with a dumbbell in each hand, arms hanging straight down.",
      "Turn your palms forward and keep your shoulders back against the bench.",
      "Curl the dumbbells up without moving your upper arms forward.",
      "Lower them slowly until your arms are fully straight and you feel a stretch in the biceps.",
    ],
    cues: [
      "Shoulders stay pinned to the bench.",
      "Upper arms stay pointing at the floor.",
      "Pause for a second in the stretch at the bottom.",
    ],
    mistakes: [
      "Bringing the elbows forward to finish the rep, which turns it into a regular curl.",
      "Too much weight. The stretched position is hard; most people need lighter dumbbells than for standing curls.",
      "Lifting the head and shoulders off the bench, which removes the stretch that is the point of the incline. Keep the back of the shoulders down.",
    ],
  },

  "cable-pushdown": {
    overview:
      "The cable pushdown pushes a bar or rope down from a high pulley by straightening the elbows. It isolates the triceps with steady tension, is gentle on the elbows, and is easy to progress in small steps, which makes it a staple for high-rep triceps work.",
    instructions: [
      "Attach a straight bar or rope to a high pulley and grip it with your elbows bent and tucked at your sides.",
      "Stand close to the stack with a slight forward lean.",
      "Push the attachment down until your arms are straight, without moving your upper arms.",
      "Let it rise until your forearms pass parallel with the floor.",
    ],
    cues: [
      "Elbows glued to your ribs.",
      "Spread the rope apart at the bottom if you use one.",
      "Squeeze the triceps at lockout.",
    ],
    mistakes: [
      "Leaning over the bar and pushing with bodyweight, so the chest and shoulders finish each rep. Stand taller and lower the weight.",
      "Elbows drifting forward and back, so the shoulders and lats help and the triceps do less. Pin them to your sides.",
      "Only moving through the bottom half. Let the hands come up to chest height.",
    ],
  },

  "barbell-lying-triceps-extension-skull-crusher": {
    overview:
      "The skull crusher is a lying barbell extension: you lower the bar towards your head by bending only at the elbows, then straighten them. It trains all three heads of the triceps, especially the large long head, and is one of the best exercises for adding size to the upper arm.",
    instructions: [
      "Lie on a flat bench holding a barbell or EZ bar over your chest with a grip about shoulder width apart.",
      "Tilt your arms back slightly so the bar is over your eyes or forehead.",
      "Bend your elbows to lower the bar towards the top of your head, keeping your upper arms still.",
      "Straighten your elbows to bring the bar back up.",
    ],
    cues: [
      "Lower the bar behind the head, not onto the forehead, for more stretch and less elbow stress.",
      "Elbows point at the ceiling, not out to the sides.",
      "Control the bottom of every rep.",
    ],
    mistakes: [
      "Flaring the elbows wide, which shifts the load to the shoulders.",
      "Going too heavy too early. Elbows complain long before triceps fail; use an EZ bar and moderate reps.",
      "Turning it into a close-grip press by moving the upper arms, which takes load off the triceps. Only the elbows should bend.",
    ],
  },

  "standing-calf-raise": {
    overview:
      "The standing calf raise rises onto the balls of the feet with the knees straight. Straight knees put the gastrocnemius, the large visible calf muscle, in a position to do most of the work, which makes this the main exercise for calf size.",
    instructions: [
      "Stand with the balls of your feet on a step or block and your heels hanging off the edge.",
      "Hold on to something for balance, or hold a dumbbell in one hand for load.",
      "Lower your heels as far as they will go until you feel a deep stretch in the calves.",
      "Pause for one to two seconds, then rise as high as you can onto your toes.",
    ],
    cues: [
      "Knees straight but not locked.",
      "Pause in the stretch; no bouncing.",
      "Push through the big toe at the top.",
    ],
    mistakes: [
      "Bouncing out of the bottom, which uses the Achilles tendon like a spring instead of the muscle.",
      "Half reps that never reach a full stretch or a full rise. Calves grow from the range, so go all the way down and all the way up.",
      "Bending the knees to move more weight, which shifts the work to the soleus.",
    ],
  },

  "seated-calf-raise": {
    overview:
      "The seated calf raise lifts the heels with the knees bent at about 90 degrees and the load on the thighs. Bending the knee slackens the gastrocnemius, so the soleus underneath it does most of the work. The soleus is a large muscle that standing raises barely reach.",
    instructions: [
      "Sit at a seated calf machine, or on a bench with weight on your knees, with the balls of your feet on a raised edge.",
      "Release the safety and lower your heels as far as they go.",
      "Pause in the stretch for one to two seconds.",
      "Press up onto your toes as high as you can and hold briefly at the top.",
    ],
    cues: [
      "Slow and full: three seconds down, a pause, then up.",
      "Keep the pressure on the big toe.",
      "Higher reps suit the soleus; 12 to 25 works well.",
    ],
    mistakes: [
      "Short, fast reps, the most common reason calves do not grow.",
      "Skipping it because you already do standing raises. They train different muscles.",
      "Letting the ankles roll out to the little toes at the top, which unloads the inside of the calf. Keep pressure through the big toe.",
    ],
  },

  "donkey-calf-raise": {
    overview:
      "The donkey calf raise is a straight-knee calf raise done bent forward at the hips, with the load on the hips or lower back. The hip hinge stretches the gastrocnemius further than a standing raise, which is why it has been an advanced calf exercise for decades.",
    instructions: [
      "Stand with the balls of your feet on a block and bend forward at the hips, resting your forearms on a bench or machine pad.",
      "Keep your knees straight and your back flat. Load comes from a machine, a belt or a partner on your hips.",
      "Lower your heels until you feel a deep stretch in your calves.",
      "Pause, then rise as high as you can onto your toes.",
    ],
    cues: [
      "Hips stay over the feet; only the ankles move.",
      "Pause for two seconds in the stretch.",
      "Squeeze at the top for one second.",
    ],
    mistakes: [
      "Bending the knees, which shifts the work to the soleus and loses the stretch that makes donkey raises worth doing. Keep the legs straight.",
      "Rounding the back to reach the support. Raise the support instead.",
      "Rushing reps. The stretch is the reason to do this variation.",
    ],
  },

  "front-plank": {
    overview:
      "The front plank holds a straight line from head to heels on your forearms and toes. It trains the abs and deep trunk muscles to resist your lower back sagging, the same stiffness that protects the spine in squats, deadlifts and presses.",
    instructions: [
      "Place your forearms on the floor, elbows under your shoulders.",
      "Step your feet back so your body forms a straight line from head to heels.",
      "Tuck your pelvis slightly, squeeze your glutes and pull your ribs down towards your hips.",
      "Hold the position, breathing steadily, for the set time.",
    ],
    cues: [
      "Pull your elbows towards your toes to make it harder without moving.",
      "Glutes tight, ribs down.",
      "Look at the floor just in front of your hands.",
    ],
    mistakes: [
      "Hips sagging, which puts the load on the lower back instead of the abs.",
      "Hips piked high to make it easier, which takes almost all the load off the abs. Line up heels, hips and shoulders.",
      "Holding for minutes with poor form. 20 to 45 hard seconds is better; add load or harder variations instead of time.",
    ],
  },

  "hanging-straight-leg-raise": {
    overview:
      "The hanging straight leg raise hangs from a bar and lifts straight legs to at least hip height. It trains the lower abs and the hip flexors, builds grip strength from the hang, and is one of the hardest bodyweight ab exercises there is.",
    instructions: [
      "Hang from a pull-up bar with an overhand grip and straight arms.",
      "Set your shoulders down and brace your abs to stop any swing.",
      "Keeping your legs straight, lift them in front of you to hip height or higher.",
      "Curl your pelvis up at the top, then lower your legs slowly.",
    ],
    cues: [
      "Tilt the pelvis up at the top; that is the ab part of the rep.",
      "Lower for three seconds to kill the swing.",
      "Bend the knees if you cannot keep the legs straight.",
    ],
    mistakes: [
      "Swinging the legs up with momentum, so the swing does the lift instead of the abs. Pause at the bottom of each rep.",
      "Only lifting the legs without curling the pelvis, which makes it mostly a hip-flexor exercise.",
      "Letting grip end the set. Use straps if your hands give out before your abs.",
    ],
  },

  "barbell-sumo-deadlift": {
    overview:
      "The sumo deadlift lifts a barbell from the floor with a very wide stance and the hands inside the knees. The wide stance keeps the torso more upright than a conventional deadlift, shifts work towards the glutes, quads and adductors, and shortens the distance the bar travels.",
    instructions: [
      "Stand with your feet well outside shoulder width, toes turned out 30 to 45 degrees, and shins close to the bar.",
      "Bend down and grip the bar with your hands inside your legs, about shoulder width apart.",
      "Push your knees out over your toes, drop your hips and set your chest up and back flat.",
      "Push the floor away with your legs, keeping the bar against your body, until you stand tall.",
      "Lower the bar by pushing the hips back and bending the knees.",
    ],
    cues: [
      "Spread the floor apart with your feet.",
      "Pull the slack out of the bar before it leaves the floor.",
      "Hips and shoulders rise together.",
    ],
    mistakes: [
      "Knees caving in as the bar leaves the floor, which strains the knees and loses the glutes. Push the knees out over the toes.",
      "Hips shooting up first, which turns it into a stiff-leg pull.",
      "A stance so wide you cannot get into position. Start moderately wide and widen with practice.",
    ],
  },

  "glute-bridge-two-legs-on-floor": {
    overview:
      "The glute bridge lifts your hips off the floor while lying on your back with your knees bent. It trains the glutes at full hip extension with no equipment, and it is the starting point for the hip thrust, its loaded big brother.",
    instructions: [
      "Lie on your back with your knees bent, feet flat on the floor about hip-width apart and close to your glutes.",
      "Tuck your pelvis slightly so your lower back flattens towards the floor.",
      "Push through your heels and lift your hips until your body forms a straight line from knees to shoulders.",
      "Squeeze your glutes for one to two seconds at the top, then lower slowly.",
    ],
    cues: [
      "Drive through the heels, not the toes.",
      "Ribs down; the lift comes from the hips, not an arched back.",
      "Squeeze as if holding a coin between your glutes.",
    ],
    mistakes: [
      "Arching the lower back at the top instead of extending the hips.",
      "Feet too far away, which makes the hamstrings cramp and do the work.",
      "Rushing reps. The pause at the top is what makes the bridge hard.",
    ],
  },

  "farmers-walk": {
    overview:
      "The farmer's walk is a loaded carry: you pick up a heavy weight in each hand and walk with it. It builds grip strength, the traps and forearms, and a braced trunk all at once, and it is one of the simplest exercises for strength that carries over to everyday life.",
    instructions: [
      "Stand between two heavy dumbbells, kettlebells or farmer's handles.",
      "Hinge down with a flat back and grip them in the middle of the handle.",
      "Stand up tall, shoulders back and down, abs braced.",
      "Walk with short, quick steps for the set distance or time, then set the weights down by hinging again.",
    ],
    cues: [
      "Tall posture, as if balancing a book on your head.",
      "Crush the handles.",
      "Short steps, heel to toe.",
    ],
    mistakes: [
      "Leaning or shrugging under weights that are too heavy, which turns a posture exercise into a posture problem. Go lighter and stand tall.",
      "Rounding the back to pick the weights up. The pick-up is a deadlift; hinge with a flat back, then walk.",
      "Long strides that make the weights swing and pull you off balance. Take short, quick steps instead.",
    ],
  },

  // Phase 2 batch (2026-11-05): lunges, hinge and hip thrust variants, rows,
  // push-up variants, pulldown variants and two conditioning movements. Each
  // one was checked for a working demo clip before it was written.

  "dumbbell-lunge": {
    overview:
      "The dumbbell lunge is a forward step into a split stance with a dumbbell in each hand, training the quads and glutes of the front leg one side at a time. Because each leg works alone, it exposes and corrects strength differences between sides that a squat lets the stronger leg hide.",
    instructions: [
      "Stand tall with feet hip width, a dumbbell in each hand hanging at your sides.",
      "Take a long step forward with one leg, landing heel first, and keep your torso upright.",
      "Lower straight down until the back knee is just above the floor and the front thigh is about parallel to it.",
      "Push through the front heel and midfoot to drive back up to the starting position.",
      "Finish all reps on one leg, or alternate legs each rep, keeping the count equal on both sides.",
    ],
    cues: [
      "Drop the back knee straight down, as if lowering it onto a cushion, rather than lurching forward.",
      "Keep the front knee tracking over the middle toes, not caving inwards.",
      "Stay tall; the dumbbells hang from straight arms and never swing.",
    ],
    mistakes: [
      "Stepping too short, so the front knee shoots far past the toes and the heel lifts. Take a longer step so the shin stays closer to vertical.",
      "Standing on a tightrope, with both feet on one line. Keep the feet roughly hip width apart side to side so you can balance under load.",
      "Pushing off the back foot to stand up. The front leg should do the work; the back leg is mostly for balance.",
    ],
  },

  "dumbbell-walking-lunge": {
    overview:
      "The dumbbell walking lunge chains lunges together so you travel forward with every rep, holding a dumbbell in each hand. It works the quads and glutes hard, adds a balance and conditioning demand, and is one of the most effective leg exercises you can do with only a pair of dumbbells and some floor space.",
    instructions: [
      "Stand at one end of a clear lane with a dumbbell in each hand at your sides.",
      "Step forward into a lunge and lower until the back knee nearly touches the floor.",
      "Drive through the front foot and bring the back leg straight through into the next step, without pausing with both feet together.",
      "Keep walking, alternating legs, for the set number of steps or the length of the lane.",
      "Turn around under control or set the weights down; do not rush the turn with heavy dumbbells.",
    ],
    cues: [
      "Each step is a full lunge; let the back knee come close to the floor every time.",
      "Keep your eyes forward and your chest up so the weights stay over your feet.",
      "Move with a steady rhythm rather than racing to the end of the lane.",
    ],
    mistakes: [
      "Shortening the steps as you tire, which turns the second half of the set into a quad-only shuffle. Keep the stride length the same from first rep to last.",
      "Letting the torso fold forward. It shifts the load into the lower back; go lighter or slow down.",
      "Using weights so heavy that grip fails before the legs do. Use straps or lighter dumbbells for more steps.",
    ],
  },

  "reverse-lunge": {
    overview:
      "The reverse lunge is a lunge performed by stepping backwards instead of forwards, training the glutes and quads of the front leg with less stress on the knee. Stepping back keeps the working shin closer to vertical, which is why it is the lunge most coaches teach first and the one most people with sore knees tolerate best.",
    instructions: [
      "Stand tall with feet hip width and your hands on your hips or at your sides.",
      "Step one foot straight back, landing on the ball of the foot.",
      "Lower until the back knee is just above the floor, keeping most of your weight on the front foot.",
      "Drive through the front heel to stand up and bring the back foot forward to meet it.",
      "Repeat on the same leg for the set, then switch, or alternate legs each rep.",
    ],
    cues: [
      "Think of the back leg as a kickstand: it touches down for balance, the front leg lifts you.",
      "Lean the torso forward slightly to load the glutes more; stay upright to load the quads more.",
      "Keep the hips square to the front rather than letting them twist open.",
    ],
    mistakes: [
      "Stepping back too short, which crowds the front knee and makes the lunge awkward. Step far enough that both knees form roughly right angles at the bottom.",
      "Pushing off the back toes to come up. If the back leg is doing the lifting, the front leg is not being trained.",
      "Stepping back on a diagonal, which costs balance. Step straight back, with the feet still hip width apart.",
    ],
  },

  "single-leg-hip-thrusts": {
    overview:
      "The single-leg hip thrust is a bodyweight hip thrust done on one leg, with the upper back on a bench and the other leg lifted. It trains the glute of the working leg through full hip extension and doubles the load on each side without adding any weight, which makes it the natural next step once a two-leg bodyweight thrust gets easy.",
    instructions: [
      "Sit on the floor with your upper back against the long edge of a bench, knees bent and feet flat.",
      "Lift one foot off the floor and hold that knee bent, or the leg straight, for the whole set.",
      "Drive through the heel of the planted foot and raise your hips until your torso and working thigh form a straight line.",
      "Squeeze the glute at the top for one second.",
      "Lower under control until your hips are just above the floor, then repeat before switching sides.",
    ],
    cues: [
      "Keep the hips level; the lifted side should not drop as you rise.",
      "Chin tucked, ribs down, so the range comes from the hip and not the lower back.",
      "Push through the heel, not the toes.",
    ],
    mistakes: [
      "Letting the pelvis tilt towards the lifted leg. It means the working glute is not stabilising; slow down and shorten the range until the hips stay level.",
      "Arching the lower back at the top to fake height. Stop at a straight line from shoulders to knee.",
      "Placing the foot too far out, so the hamstring cramps and takes over. Bring the foot closer until the shin is vertical at the top.",
    ],
  },

  "dumbbell-romanian-deadlift": {
    overview:
      "The dumbbell Romanian deadlift is a hip hinge with a dumbbell in each hand, training the hamstrings and glutes through a long stretch while the knees stay softly bent. It teaches the same pattern as the barbell version with lighter, freer weights, which makes it the easiest way to learn the hinge and a strong hamstring builder in its own right.",
    instructions: [
      "Stand tall with feet hip width, holding a dumbbell in each hand in front of your thighs, palms facing you.",
      "Soften the knees slightly and hold that bend for the whole set.",
      "Push your hips back and let the dumbbells slide down the front of your legs, keeping your back flat.",
      "Stop when you feel a strong stretch in the hamstrings, usually around mid-shin.",
      "Drive the hips forward to stand back up, squeezing the glutes at the top.",
    ],
    cues: [
      "Hips go back, chest comes forward; the dumbbells just follow.",
      "Keep the dumbbells close enough to brush your legs on the way down.",
      "Shoulders stay pulled back so the upper back does not round.",
    ],
    mistakes: [
      "Bending the knees more and more as you go down, which turns the hinge into a squat. Set the knee angle at the start and keep it.",
      "Letting the dumbbells hang away from the body. The further forward they drift, the more the lower back has to work.",
      "Going lower than the hamstrings allow and rounding the back. Depth is set by your flexibility, not by how close the weights get to the floor.",
    ],
  },

  "trap-bar-deadlift": {
    overview:
      "The trap bar deadlift is a deadlift with a hexagonal bar that you stand inside, so the load sits at your sides instead of in front of your shins. That keeps the torso more upright than a straight-bar deadlift, shares the work between the quads, glutes and back, and makes it the easiest heavy pull to learn safely.",
    instructions: [
      "Step into the centre of the trap bar with your feet about hip width apart.",
      "Hinge at the hips and bend the knees to grip the handles in the middle, arms straight.",
      "Flatten your back, lift your chest and brace your midsection hard.",
      "Push the floor away and stand up tall, keeping the bar balanced over the middle of your feet.",
      "Lower the bar back to the floor by pushing the hips back and bending the knees together.",
    ],
    cues: [
      "Think about pushing the floor away, not pulling the bar up.",
      "Big breath and brace before every rep, not just the first one.",
      "Hips and shoulders rise at the same speed.",
    ],
    mistakes: [
      "Standing off-centre in the bar, so it tips forward or back as you lift. Line the handles up with the middle of your feet before you grip.",
      "Squatting the bar up with the hips too low and the chest too high. The trap bar is more upright than a deadlift, but it is still a hinge; let the hips sit back.",
      "Dropping the bar from the top instead of lowering it. The way down is part of the rep, and a dropped trap bar bounces unpredictably.",
    ],
  },

  "dumbbell-single-leg-deadlift": {
    overview:
      "The dumbbell single-leg deadlift is a hip hinge on one leg while the other leg reaches back, holding a dumbbell in one or both hands. It trains the hamstring and glute of the standing leg along with balance and hip control, and it is one of the best exercises for evening out a left to right difference in the posterior chain.",
    instructions: [
      "Stand on one leg with a soft bend in the knee, holding a dumbbell in the opposite hand.",
      "Hinge forward at the hip, letting the free leg reach straight back as your torso lowers.",
      "Keep your back flat and your hips square to the floor as the dumbbell travels towards the standing foot.",
      "Lower until your torso and back leg are close to parallel with the floor, or until the hamstring stretch stops you.",
      "Drive the standing hip forward to return upright, then repeat before switching sides.",
    ],
    cues: [
      "Your torso and back leg move as one straight line, like a seesaw.",
      "Point the toes of the back foot at the floor to keep the hips square.",
      "Grip the floor with the standing foot to stay balanced.",
    ],
    mistakes: [
      "Opening the hip so the back leg rotates out to the side. Keep the back toes pointing down and the hips level.",
      "Bending the standing knee into a squat. The knee keeps one soft angle; the movement is at the hip.",
      "Rushing to save balance. Slow down and use a light touch on a wall or rack if you need to; balance improves within a few sessions.",
    ],
  },

  "smith-incline-bench-press": {
    overview:
      "The Smith machine incline bench press is an incline press performed on a bar fixed to vertical rails, set over a bench angled at about 30 degrees. It targets the upper chest and front deltoids, and the fixed path lets you press heavy with no spotter and no balancing, which makes it useful for pushing close to failure safely.",
    instructions: [
      "Set an adjustable bench to about 30 degrees and position it so the bar lowers onto your upper chest.",
      "Lie back, set your feet flat and pull your shoulder blades together and down into the bench.",
      "Grip the bar slightly wider than shoulder width, rotate it to unhook it from the safeties, and set the stops just above chest height.",
      "Lower the bar under control until it touches your upper chest, just below the collarbones.",
      "Press back up to straight arms, then rotate the bar to re-hook it when the set is done.",
    ],
    cues: [
      "Keep the shoulder blades pinned back the whole set.",
      "Elbows at roughly 45 degrees from your torso, slightly under the bar.",
      "Lower slowly; the fixed bar makes it tempting to drop it fast.",
    ],
    mistakes: [
      "Setting the bench in the wrong spot so the bar comes down on your neck or your stomach. Check the bar path with an empty bar before loading it.",
      "Using too steep an incline. Past about 45 degrees it becomes a shoulder press; 30 degrees keeps the upper chest in charge.",
      "Skipping the safety stops. The machine only protects you if the stops are set just above your chest.",
    ],
  },

  "dumbbell-one-arm-bent-over-row": {
    overview:
      "The one-arm dumbbell row is a single-arm row with one hand and one knee braced on a bench, pulling a dumbbell from a hanging position up to the hip. It trains the lats, the middle back and the rear deltoids, and the braced position lets you row heavy with almost no strain on the lower back.",
    instructions: [
      "Place one knee and the hand on the same side on a flat bench, with the other foot on the floor.",
      "Hold the dumbbell in your free hand, arm hanging straight below your shoulder, back flat.",
      "Pull the dumbbell up and back towards your hip, leading with the elbow.",
      "Stop when the elbow passes your torso and squeeze the shoulder blade towards your spine.",
      "Lower the dumbbell until the arm is straight and you feel the lat stretch, then repeat before switching sides.",
    ],
    cues: [
      "Pull the elbow towards your back pocket, not straight up to your armpit.",
      "Keep your shoulders square to the floor; do not twist to lift the weight higher.",
      "Let the shoulder blade move forward at the bottom for a full stretch.",
    ],
    mistakes: [
      "Rotating the torso to heave the weight up. It makes the rep look bigger and shifts the work away from the back; use a weight you can row with square shoulders.",
      "Shrugging the dumbbell up towards the ear, which trains the upper traps instead of the lats.",
      "Cutting the range short at the bottom. The stretched position is a big part of what the row trains.",
    ],
  },

  "dumbbell-bent-over-row": {
    overview:
      "The dumbbell bent-over row is a two-arm row performed standing in a hip hinge, pulling a dumbbell in each hand towards the hips. It trains the lats, rhomboids, middle traps and rear deltoids, and it builds the back thickness and posture that most pressing-heavy programmes leave behind.",
    instructions: [
      "Stand with feet hip width, a dumbbell in each hand, knees softly bent.",
      "Hinge at the hips until your torso is around 45 degrees or lower, back flat, arms hanging straight.",
      "Pull both dumbbells up towards your hips, driving the elbows back.",
      "Squeeze the shoulder blades together at the top for a moment.",
      "Lower the dumbbells under control to straight arms while holding the hinge.",
    ],
    cues: [
      "Hold the torso still; only the arms and shoulder blades move.",
      "Elbows travel back at about 30 to 45 degrees from the body.",
      "Brace the midsection so the lower back does not round as you tire.",
    ],
    mistakes: [
      "Standing up a little more with each rep until the row becomes a shrug. Keep the torso angle fixed for the whole set.",
      "Jerking the weights with the hips. If you need momentum to get them up, they are too heavy.",
      "Rounding the lower back to reach the weights. Keep the back flat and hinge only as far as your hamstrings allow.",
    ],
  },

  "push-up-body-weight": {
    overview:
      "The push-up is a bodyweight press in which you lower your chest to the floor from a straight-arm plank and push back up. It trains the chest, front deltoids and triceps while the abs and glutes hold the body rigid, and it needs no equipment, which makes it the most practical upper-body strength exercise there is.",
    instructions: [
      "Start in a high plank with hands slightly wider than shoulder width, fingers pointing forward.",
      "Squeeze your glutes and brace your abs so your body forms one straight line from head to heels.",
      "Bend your elbows and lower your chest towards the floor, elbows angled about 45 degrees from your sides.",
      "Lower until your chest is about a fist from the floor.",
      "Push the floor away to straighten your arms, keeping the body in one line.",
    ],
    cues: [
      "Move as a single plank; the hips rise and fall with the shoulders.",
      "Screw your hands into the floor to keep the elbows from flaring.",
      "At the top, push the floor away an extra inch to spread the shoulder blades.",
    ],
    mistakes: [
      "Sagging hips, which puts the lower back under strain. Squeeze the glutes and shorten the set rather than letting the hips drop.",
      "Flaring the elbows straight out to the sides, the usual cause of sore shoulders from push-ups. Keep them at about 45 degrees.",
      "Half reps that stop a few inches down. Lower the chest close to the floor each time, or use an incline until you can.",
    ],
  },

  "diamond-push-up": {
    overview:
      "The diamond push-up is a push-up with the hands together under the chest, thumbs and index fingers forming a diamond shape. The narrow hand position shifts much of the work from the chest to the triceps, which makes it one of the best triceps exercises you can do with bodyweight alone.",
    instructions: [
      "Kneel on the floor and place your hands together under your chest, thumbs and index fingers touching to form a diamond.",
      "Step your feet back into a high plank, body straight from head to heels.",
      "Lower your chest towards your hands, keeping the elbows close to your sides.",
      "Go down until your chest is just above your hands.",
      "Press back up to straight arms, squeezing the triceps at the top.",
    ],
    cues: [
      "Elbows brush your ribs on the way down rather than pointing out.",
      "Keep the hands under the lower chest, not under the face.",
      "Brace the whole body; the plank still matters.",
    ],
    mistakes: [
      "Placing the hands under the face, which pushes the load onto the wrists and shoulders. Keep them under the bottom of the breastbone.",
      "Flaring the elbows wide, which turns it back into a regular push-up with an awkward wrist angle.",
      "Attempting full reps before you are strong enough and doing half reps instead. Do them from the knees or on an incline first.",
    ],
  },

  "incline-push-up": {
    overview:
      "The incline push-up is a push-up with the hands raised on a bench, box or wall, so you press a smaller share of your bodyweight. It trains the chest, shoulders and triceps with the same mechanics as a floor push-up, and it is the best way to build up to full push-ups because the difficulty adjusts with the height of the surface.",
    instructions: [
      "Place your hands on the edge of a sturdy bench or box, slightly wider than shoulder width.",
      "Walk your feet back until your body forms a straight line from head to heels.",
      "Lower your chest to the edge of the bench, elbows angled about 45 degrees from your sides.",
      "Touch your chest lightly to the edge or come within an inch of it.",
      "Push back to straight arms while holding the straight body line.",
    ],
    cues: [
      "The higher the surface, the easier the rep; lower it as you get stronger.",
      "Keep the glutes tight so the hips do not sag towards the bench.",
      "Lead with the chest, not the chin.",
    ],
    mistakes: [
      "Using a surface that can slide or tip. Brace a bench against a wall or use a fixed rail.",
      "Staying at the same height for months. Once 15 clean reps are easy, move to a lower surface.",
      "Poking the head forward to touch the bench, which shortens the range for the chest. Bring the chest down, not the face.",
    ],
  },

  "decline-push-up": {
    overview:
      "The decline push-up is a push-up with the feet raised on a bench or step, which shifts more of your bodyweight onto your hands and angles the press upwards. It puts more load on the upper chest and front deltoids than a flat push-up, making it a harder progression for people who can already do 20 or more regular reps.",
    instructions: [
      "Place your feet on a bench or step behind you and your hands on the floor slightly wider than shoulder width.",
      "Brace your abs and glutes so your body is straight from head to heels.",
      "Lower your chest towards the floor with your elbows at about 45 degrees.",
      "Go down until your chin or chest is close to the floor.",
      "Press back up to straight arms without letting the hips pike up or sag.",
    ],
    cues: [
      "Hands slightly forward of the shoulders, so you press upwards and outwards.",
      "Keep the plank long; a higher foot position makes the hips want to sag.",
      "Control the bottom; the extra load makes it easy to drop too fast.",
    ],
    mistakes: [
      "Raising the feet too high before you are ready, which makes the rep a shoulder exercise you cannot control. Start with a low step.",
      "Letting the hips sag towards the floor, which loads the lower back. Squeeze the glutes and stop the set when you cannot hold the line.",
      "Bobbing the head down instead of the chest. Keep the neck neutral and lower the whole body.",
    ],
  },

  "pike-push-up": {
    overview:
      "The pike push-up is a push-up done from an inverted V position, hips high, so you press your bodyweight more vertically. It shifts the work from the chest to the shoulders and triceps, and it is the standard bodyweight substitute for an overhead press and the first step towards a handstand push-up.",
    instructions: [
      "Start in a push-up position, then walk your feet in and lift your hips until your body forms an upside-down V.",
      "Set your hands slightly wider than shoulder width, arms straight, head between your arms.",
      "Bend your elbows and lower the top of your head towards the floor, slightly in front of your hands.",
      "Stop just before your head touches the floor.",
      "Press back up to straight arms, pushing your hips towards the ceiling.",
    ],
    cues: [
      "Your head travels forward of your hands, forming a triangle with them.",
      "Keep the hips high; the more vertical the torso, the harder it gets.",
      "Elbows point back, not straight out to the sides.",
    ],
    mistakes: [
      "Letting the hips drop so it becomes an ordinary push-up. Keep the V shape for every rep.",
      "Lowering the head straight down between the hands, which jams the shoulders. Aim for a spot just in front of them.",
      "Going too fast into the bottom. The head is close to the floor; control it.",
    ],
  },

  "sled-hack-squat": {
    overview:
      "The sled hack squat is a squat performed on an angled machine with your back against a pad and shoulders under supports, so the weight moves along a fixed track. It trains the quads hard, with the glutes as secondary movers, and because the back is supported the legs can be pushed close to failure with little demand on the lower back.",
    instructions: [
      "Step onto the platform with your back flat against the pad and your shoulders under the supports.",
      "Place your feet about shoulder width in the middle of the platform, toes turned out slightly.",
      "Release the safety handles and lower yourself by bending your knees, keeping your back on the pad.",
      "Descend until your thighs are at least parallel to the platform, or as deep as you can go with your heels down.",
      "Press through the whole foot to straighten your legs, stopping just short of locking the knees, and re-engage the safeties when done.",
    ],
    cues: [
      "Knees track over the toes and are allowed to travel forward; that is the point of the machine.",
      "Keep your lower back pressed into the pad at the bottom.",
      "Control the descent for two to three seconds.",
    ],
    mistakes: [
      "Cutting depth to move more weight. A half-rep hack squat trains far less quad than a full one with less weight.",
      "Lifting the heels at the bottom. Move the feet a little higher on the platform if your ankles limit you.",
      "Slamming the knees into lockout at the top. Stop just short and keep tension on the quads.",
    ],
  },

  "cable-underhand-pulldown": {
    overview:
      "The cable underhand pulldown is a lat pulldown with a shoulder-width, palms-facing-you grip. The supinated grip brings the biceps in and lets the elbows travel closer to the body, which many lifters find gives a stronger lat contraction and a heavier pull than the wide overhand version.",
    instructions: [
      "Sit at the pulldown station with your thighs locked under the pad.",
      "Take the bar with an underhand grip at about shoulder width, arms straight overhead.",
      "Lean back slightly, chest up, and pull the bar down towards your upper chest.",
      "Drive the elbows down and back until the bar touches or nearly touches your chest.",
      "Let the bar rise back up under control until your arms are straight and the lats are stretched.",
    ],
    cues: [
      "Think of pulling your elbows into your back pockets.",
      "Keep the chest up to meet the bar instead of curling forward.",
      "Let the shoulders rise fully at the top for a full lat stretch.",
    ],
    mistakes: [
      "Turning it into a biceps curl by bending the elbows without moving the shoulders. Start each rep by pulling the shoulder blades down.",
      "Leaning far back and rowing the bar down with momentum. A slight lean is enough.",
      "Gripping too wide with palms up, which strains the wrists and elbows. Keep the grip about shoulder width.",
    ],
  },

  "close-grip-front-lat-pulldown": {
    overview:
      "The close-grip lat pulldown is a pulldown with the hands close together, usually on a V-handle or a narrow grip on the bar, pulled down to the upper chest. The narrow grip gives the longest range of motion of any pulldown and keeps the elbows in front of the body, which loads the lower lats and makes it a strong partner to wide-grip work.",
    instructions: [
      "Attach a V-handle or take a narrow grip on the bar, and sit with your thighs under the pad.",
      "Start with your arms straight overhead, shoulders allowed to rise into a stretch.",
      "Lean back slightly and pull the handle down towards your upper chest, elbows travelling down and close to your sides.",
      "Squeeze the lats when the handle reaches your chest.",
      "Let the handle rise slowly back to the stretched position.",
    ],
    cues: [
      "Elbows drive down towards your hips.",
      "Lift the chest towards the handle.",
      "Use the full stretch at the top; that is where this grip earns its place.",
    ],
    mistakes: [
      "Rounding forward to bring the handle down. Keep the chest up and the torso still.",
      "Stopping the handle at the chin, which cuts off the strongest part of the contraction. Pull to the upper chest.",
      "Letting the weight yank the arms up at the top. Control the return; that is half of the rep.",
    ],
  },

  "cable-straight-arm-pulldown": {
    overview:
      "The cable straight-arm pulldown is a lat isolation exercise where you push a bar or rope down from shoulder height to your thighs while keeping your arms straight. With the elbows fixed, the biceps cannot help, so the lats do all the work, which makes it the clearest way to learn what a lat contraction feels like.",
    instructions: [
      "Set a high cable pulley and attach a straight bar or rope.",
      "Stand facing the machine, feet hip width, and take the bar with a shoulder-width overhand grip.",
      "Hinge forward slightly from the hips and hold your arms straight with a slight bend in the elbows.",
      "Sweep the bar down in an arc until it touches the front of your thighs.",
      "Let the bar rise back up under control until your arms are about level with your head.",
    ],
    cues: [
      "Keep the elbow angle fixed; the arm moves as one lever from the shoulder.",
      "Think of pushing the bar into your thighs with your armpits.",
      "Keep the ribs down so the lower back does not arch as you finish.",
    ],
    mistakes: [
      "Bending the elbows to push the bar down, which turns it into a triceps pushdown. Keep the arms long.",
      "Using the torso to swing the weight. Hold the slight hinge still for the whole set.",
      "Going too heavy. This is an isolation exercise; a weight you can control for 12 to 15 reps works the lats far better.",
    ],
  },

  "kettlebell-swing": {
    overview:
      "The kettlebell swing is an explosive hip hinge that drives a kettlebell from between the legs to chest height using a powerful snap of the hips. It trains the glutes, hamstrings and lower back for power, and because it is fast and repeatable it doubles as one of the most effective conditioning exercises with a single piece of equipment.",
    instructions: [
      "Stand with feet a little wider than shoulder width, a kettlebell on the floor about a foot in front of you.",
      "Hinge at the hips, grab the handle with both hands, and tilt the bell back towards you.",
      "Hike the bell back between your legs, like a football snap, keeping your back flat.",
      "Drive your hips forward hard and stand tall, letting the bell float up to chest height from the hip drive alone.",
      "Let the bell fall back between your legs, hinge to meet it, and go straight into the next rep.",
    ],
    cues: [
      "It is a hip snap, not a squat and not a front raise; the arms only guide the bell.",
      "Finish each rep standing tall, glutes squeezed and abs braced, like a standing plank.",
      "Wait for the bell to drop before you hinge; let it come to you.",
    ],
    mistakes: [
      "Squatting the swing, with the knees bending deeply and the hips staying low. Push the hips back, keep the shins near vertical.",
      "Lifting the bell with the arms and shoulders. If the bell is not floating up on its own, drive the hips harder.",
      "Leaning back at the top to finish the rep. Stand straight; leaning back loads the lower back for no benefit.",
    ],
  },

  "burpee": {
    overview:
      "The burpee is a full-body conditioning movement that chains a squat, a plank, a push-up and a jump into one continuous rep. It needs no equipment and raises the heart rate faster than almost any other bodyweight exercise, which is why it appears in so many circuits and home workouts.",
    instructions: [
      "Stand tall with your feet about shoulder width apart and arms by your sides.",
      "Squat down and place your hands on the floor in front of your feet.",
      "Jump or step your feet back into a high plank, and lower your chest to the floor if you are doing the push-up version.",
      "Jump or step your feet back in towards your hands.",
      "Stand up and jump, reaching your arms overhead, then land softly and go straight into the next rep.",
    ],
    cues: [
      "Land the plank with a braced midsection so the hips do not crash down.",
      "Land the jump softly through the balls of the feet, knees bent.",
      "Pick a pace you can hold for the whole set rather than sprinting the first ten.",
    ],
    mistakes: [
      "Letting the hips sag when you land in the plank, which jars the lower back. Brace before the feet hit the floor.",
      "Rounding the back to reach the floor. Bend the knees and sit the hips down instead.",
      "Treating every rep as a maximal effort and stopping after 30 seconds. Steady, continuous reps condition you far better; step back instead of jumping if you need to.",
    ],
  },
};

/** Slugs with authored coaching. Used only for tests and reporting. */
export const COACHED_SLUGS = Object.keys(COACHING);
