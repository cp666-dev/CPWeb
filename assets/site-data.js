/* ============================================================
   panayi.me · shared site data
   Loaded by BOTH the classic site (/index.html) and The Building (/building/).
   Add a product here once and it appears in both.
   Fields are unchanged from the original inline arrays.
   ============================================================ */
/* ---------------- BUILDER DATA ---------------- */
const BUILDS = [
  { name:"Booth", tag:"VST", media:"video", src:"assets/booth-demo.mp4", live:true,
    desc:"Booth is a vocal producer that sits in your headphones while you record alone in <b>Ableton Live 12</b>. You load the <b>Booth Capture</b> plugin on your vocal track, paste your lyrics, set the intent and press record. After each take you hear one short note in a producer's voice, starting with what worked, then a single fix tied to a bar and a word. Booth punches you in from the right bar on its own, stops flagging the scoops you tell it to keep, and builds the comp on its own track when you're done. You finish with a summary for your mix engineer, and your vocal never leaves the laptop.",
    stack:"Python · C++17 / JUCE 8 · numpy (YIN pitch tracking) · Max for Live · AbletonOSC · AU / VST3 · macOS / Ableton Live 12",
    case:{
      problem:"Most artists now record vocals alone, so nobody is in the room to say the chorus rushed or that \"gold\" sat flat, and nobody comps the takes afterwards. Metering and tuning tools show you numbers, but they don't run the session: they can't call the punch-in, remember that a scoop was deliberate, or pick the best line from each take.",
      build:"A <b>JUCE</b> capture plugin streams the vocal and a sample-accurate playhead over localhost to a <b>Python</b> engine that analyses each take for pitch (its own <b>numpy</b> implementation of <b>YIN</b>), timing, lyrics and fatigue. Seven playbook rules decide the note: praise first, two notes at most, and timing judged against the singer's own feel. <b>Claude</b> can reword it in a producer's voice, but the rules decide what is said.",
      apiLabel:"Local-first, integration &amp; deployment",
      api:"All audio analysis runs on your machine. Only short text leaves: the draft note goes to <b>Claude</b> and the note text to <b>Fish Audio S2.1</b> for the producer voice, with macOS <b>say</b> as an offline fallback. Spoken commands like \"go again\" are transcribed locally with <b>faster-whisper</b>. Punch-ins run through <b>AbletonOSC</b>, other DAWs get a coach mode, and the plugin builds as AU and VST3 for macOS 11 and later."
    }},

  { name:"Pre-Release Vault", tag:"Web App", media:"image", src:"assets/prereleasevault-demo.png", live:true,
    desc:"Pre-Release Vault is a web app that lets software agents work on your unreleased music without being able to leak it. You upload a track, and an isolated worker extracts descriptors such as tempo, key, loudness, mood tags and a 512-dimension embedding. You then give each agent an expiring credential that names exactly which columns it may read, so <b>Claude</b> can rank this week's demos by hook score without seeing a title, an artist or the audio. Every read is signed and hash-chained into a ledger, refused attempts land there in red, and each track gets a receipt the artist can verify offline.",
    stack:"TypeScript · Next.js · Agents++ · PostgreSQL 16 + pgvector · ffmpeg · MCP · Ed25519 / AES-256-GCM · Self-hosted (Node 20)",
    case:{
      problem:"Labels, managers and producers are connecting agents to their vaults of unreleased music for tagging, A&amp;R scoring, pitch copy and sync matching, and each one becomes a new insider with broad read access, open to prompt injection hidden in a demo's metadata. The tools labels already use, such as DISCO, Haulix and Byta, are built to watermark files for human listeners. They aren't built to limit what an automated agent reads or to prove afterwards what it did.",
      build:"Each agent gets a did:key identity from <b>Agents++</b> and an expiring credential, issued by a named human, that lists the exact columns it may read. Track data is split into open descriptors, encrypted context and an encrypted core of lyrics and audio keys. Audio sits under a per-track <b>AES-256-GCM</b> key that only the analysis worker ever receives. Every agent query is parsed with <b>libpg-query</b> and allowlisted, and every read, allowed or refused, is <b>Ed25519</b>-signed and hash-chained into a tamper-evident ledger in <b>PostgreSQL</b>.",
      apiLabel:"Claude over MCP, receipts &amp; self-hosting",
      api:"<b>Claude</b> connects as the A&amp;R scout through a purpose-built <b>MCP</b> server with two tools, describe_schema and query, bound to a single agent token. It replaces the stock <b>Agents++</b> server, which would let a hijacked model issue itself new credentials. Each track's receipt is a vault-signed JSON and PDF that the artist can verify offline. It runs self-hosted on <b>Node</b> 20 with <b>PostgreSQL</b> 16 and <b>pgvector</b>, storing audio locally or on any S3-compatible store."
    }},

  { name:"Blocking", tag:"Application", media:"image", src:"assets/blocking-demo.png", live:true,
    desc:"Blocking is a Mac app that turns a folder of real multitrack stems into an editable draft mix for <b>Dolby Atmos</b>. You pick a session and describe the room in plain words, like \"backing vocals above and behind in the chorus, the synth circles me in the bridge\". Blocking finds the tempo, downbeats and sections, then a language model running on your machine through <b>Ollama</b> writes a short Scene Script that places and moves each stem. You see the result in a 3D room, drag objects or ask for changes in chat, and hear it live in binaural, stereo or 7.1.4. Every edit is undoable. You export an <b>ADM BWF</b> to finish in Dolby's own tools.",
    stack:"Python 3.12 · pywebview · three.js · EBU ADM Renderer · Ollama / Claude · PortAudio · ADM BWF · macOS",
    case:{
      problem:"Mixing a song for Dolby Atmos by hand is slow and expensive, so most independent releases never get an Atmos version. Apple Music only accepts Atmos built from real multitracks, which rules out stereo upmixes and stems split out of a finished master. The automated tools that exist either output stereo or upmix from stereo, and none of them draft an Atmos mix from real stems in the language engineers already use.",
      build:"The pipeline runs in five stages: listen, direct, rules, compile and audition. The language model never touches audio. It only writes a small JSON Scene Script, which is checked against a schema and sent back with the errors if it fails. Deterministic craft rules then correct it, keeping low end in the bed and the lead vocal front, before a compiler outputs downbeat-locked ADM. Previews use the <b>EBU ADM Renderer</b> with <b>BS.1770</b> loudness checks.",
      apiLabel:"Local-first, formats &amp; distribution",
      api:"Everything runs on your Mac: the editor is a <b>three.js</b> room inside a <b>pywebview</b> window, and with <b>Ollama</b> as the director nothing leaves the machine. <b>Claude</b> is an optional director, and an offline phrase parser works with no model at all. Monitoring goes through <b>PortAudio</b> to any output with a 7.1.4 speaker map, and exports are 48 kHz / 24-bit ADM BWF. Built with <b>PyInstaller</b> for Apple Silicon Macs on macOS 12 or later."
    }},

  { name:"OK Instruments", tag:"VST", media:"video", src:"assets/okinstruments-demo.mp4", live:true, try:"https://squishlabs.gumroad.com/l/okinstruments",
    desc:"An instrument plugin that becomes whatever synth you describe. It loads in your DAW like any AU or VST3 instrument, but instead of being one fixed synth it's a prompt box. Type something like \"squelchy acid bass with glide and a filter envelope\" and a language model running on your own machine writes the <b>Faust</b> DSP. Seconds later the plugin is that instrument: native code on the audio thread, played polyphonically from MIDI, with a panel of knobs your DAW can automate. Name a classic like a Juno-106, TB-303 or DX7 and you get a hand-built emulation of it instead.",
    stack:"C++20 · JUCE · Faust · LLVM JIT · Local LLM (Ollama) · MIDI / Polyphony · AU / VST3 · macOS / Windows",
    case:{
      problem:"Every synth is one fixed design, so finding the sound in your head means buying more of them or learning sound design from scratch. Building your own instrument means learning DSP, voice allocation, C++ and a plugin framework. AI music tools mostly run in the cloud, charge per use, and give you audio files back, not an instrument you can play and automate.",
      build:"A <b>JUCE</b> instrument sends your prompt to a local language model, which writes a polyphonic <b>Faust</b> voice from a library of pre-tested blocks. <b>LLVM</b> JIT-compiles it in milliseconds. Before it goes live, every instrument is auditioned offline with chords, extreme notes and every knob at its limits to catch clicks, stuck notes and bad tuning. Then it crossfades in with held notes carried over.",
      apiLabel:"Local-first, integration &amp; deployment",
      api:"Everything runs on your machine: no cloud calls, no API key, no account. OK Instruments auto-detects <b>Ollama</b>, <b>LM Studio</b> or <b>llama.cpp</b> and downloads a coding model sized to your RAM. Controls map onto 64 host-automatable parameters, and the Faust source is saved in your DAW session, so projects reopen offline with the same sound. Ships as <b>AU</b>, <b>VST3</b> and standalone for macOS and Windows."
    }},

  { name:"Overkill", tag:"VST", media:"video", src:"assets/overkill-demo.mp4", live:true, try:"https://squishlabs.gumroad.com/l/overkill",
    desc:"An audio plugin that becomes whatever effect you describe. It loads in your DAW like any AU or VST3, but instead of being one fixed effect it's a prompt box. Type something like \"a filthy tape delay with feedback and dry/wet\" and a language model running on your own machine writes the <b>Faust</b> DSP. That code is compiled to native code, tested, and hot-swapped onto the audio thread in seconds. You get real knobs your DAW can automate, with no dropouts, no cloud, no subscription and no new plugin to buy.",
    stack:"C++20 · JUCE · Faust · LLVM JIT · Local LLM (Ollama) · AU / VST3 · macOS / Windows",
    case:{
      problem:"Producers collect folders of single-purpose plugins and still can't find the sound in their head. Building a custom effect means learning DSP, C++ and a plugin framework. AI music tools mostly run in the cloud, charge per use, and only give you audio files back, not effects you can play through and automate.",
      build:"A <b>JUCE</b> plugin shell sends your prompt to a local language model, which writes a <b>Faust</b> program using a bundled library of pre-tested effect blocks. libfaust and <b>LLVM</b> JIT-compile it to native machine code in-process in tens of milliseconds. Before it goes live, every program is auditioned offline: test audio runs through it with every knob at its extremes to catch NaNs, blow-ups, silence, runaway feedback and CPU spikes. Compiler errors and failed checks go back to the model as targeted feedback, for up to six attempts. The new effect crossfades in over 10 ms, and a limiter and NaN watchdog catch anything unstable.",
      apiLabel:"Local-first, integration &amp; deployment",
      api:"Everything runs on your machine: no cloud calls, no API key, no account. Overkill auto-detects <b>Ollama</b>, <b>LM Studio</b> or <b>llama.cpp</b>, and the first Build downloads a coding model sized to your RAM. The generated controls map onto 32 host-automatable parameters, and the Faust source is saved in your DAW session, so projects reopen offline with exactly the same sound. Ships as a signed, notarized <b>AU</b>, <b>VST3</b> and standalone app for macOS (Apple Silicon), plus <b>VST3</b> and standalone for Windows."
    }},

  { name:"Patch V2 / UAD Patch", tag:"VST", media:"image", src:"assets/patchv2-demo.jpg", live:true,
    desc:"An instrument plugin that rebuilds a sound you drop into it, using Universal Audio's <b>UADx</b> plugins. Drop in any audio clip and Patch analyses its envelope, timbre and effects, then loads and programs a matching UADx instrument and effects chain inside itself. Before it trusts a match, it plays candidate chains back offline, scores them against your clip and adjusts the settings until they sound closer. You get a playable instrument with real UADx gear behind it, with no presets to dig through and no prompt to write.",
    stack:"C++20 · JUCE · DSP · Spectral Analysis · AU / VST3 Hosting · UADx · CMake · macOS",
    case:{
      problem:"Producers hear a sound on a record and lose an afternoon trying to recreate it, scrolling presets and guessing which synth, which reverb and which settings. Owning a full UADx bundle doesn't fix that: 58 plugins and 1,828 parameters make it harder. Preset browsers search by name, not by sound, and AI tools give you audio files, not a patch you can play and tweak.",
      build:"A <b>JUCE</b> instrument analyses the clip's envelope, spectrum, pitch and effects on-device, then a deterministic ToneMatcher maps them onto a measured knowledge base of all 58 <b>UADx</b> plugins. The top candidates are rendered offline, scored by spectral similarity and tuned until they stop improving. If nothing's close enough, a native wavetable synth reconstructs the source instead.",
      api:"No cloud, no API key, no network. Analysis and matching run inside the plugin, and the UADx knowledge base is compiled into the binary. The matched instrument and effects chain run inside Patch through the <b>AU</b>/<b>VST3</b> hosting APIs, so it behaves the same in every DAW and doesn't depend on Logic channel strips. The full chain and every plugin's state are saved in your session. Ships as AU, VST3 and a standalone macOS app."
    }},

  { name:"Chops", tag:"Application", media:"video", src:"assets/chops-demo.mp4", live:true, buy:"https://squishlabs.store",
    desc:"A desktop sampler that listens before you do. Drop in a folder of audio and it analyzes onset, BPM, key and loudness, then auto-chops it into transients, beat-grid loops and phrases. Type a vibe and local <b>CLAP</b> embeddings re-rank every pad by semantic match, no cloud required. Send any chop to <b>LALAL.AI</b> to split into stems on demand.",
    stack:"Audio DSP · Onset detection · CLAP · Local embeddings · LALAL.AI API · macOS",
    case:{
      problem:"Chopping a folder of samples into usable pads is slow, repetitive work: setting transient markers by hand, tagging by feel, remembering which folder had the right snare.",
      build:"A native macOS analysis pipeline runs onset detection, BPM and key estimation, and loudness analysis on every file the moment it's dropped in, then auto-slices each one into transients, beat-grid loops and phrases and lays them onto sample pads.",
      api:"Semantic search runs on local <b>CLAP</b> embeddings computed on-device, so typing a vibe re-ranks the pads with no network round trip. Stem separation is the one external call: any chop can be sent to the <b>LALAL.AI</b> REST API, which returns isolated drums, bass, vocals and keys. Ships as a standalone macOS app."
    }},

  { name:"Fadie", tag:"Application", media:"image", src:"assets/fadie-demo.png", live:true,
    desc:"Fadie turns any physical object on your desk into a real-time hardware controller for Logic Pro without needing a MIDI controller. Point an iPhone in Desk View (or any webcam) at a doorknob, a jar lid, or a fader you've drawn in Sharpie, and Fadie tracks it with on-device computer vision, turning its motion into 14-bit MIDI automation your DAW can learn like any control surface.",
    stack:"Swift · SwiftUI · Metal · AVFoundation · Apple Vision · CoreMIDI · Continuity Camera (Desk View) · 14-bit MIDI CC · Computer Vision · macOS 14+",
    case:{
      problem:"Producers want the tactile feel of hands-on hardware control for mixing and automation, but most don't own a control surface. Buying one for every parameter isn't realistic. The alternative is dragging a mouse through automation lanes, which kills the physical, expressive feel that makes hardware mixing fun.",
      build:"A native macOS app watches your desk through Continuity Camera's Desk View (or any UVC camera) and runs it through Apple's Vision framework in real time. A rotary tracker reads printable fiducial markers for knob-style motion, and a hand-pose tracker follows a fingertip along a hand-drawn fader. A One Euro filter and touch-gate logic smooth the signal and prevent accidental writes, targeting under 40ms perceived latency end to end.",
      api:"No cloud calls, no plugin API. Everything runs on-device via <b>AVFoundation</b>, <b>Vision</b>, and <b>CoreMIDI</b>. Fadie exposes itself as a virtual CoreMIDI source emitting 14-bit MIDI CC pairs (16,384-step resolution) over Universal MIDI Packets, so Logic Pro picks it up through standard Controller Assignments \"Learn,\" exactly like hardware. Ships as a standalone macOS 14+ app, plus a printable PDF sticker sheet for fiducial markers."
    }},

  { name:"LLS", tag:"VST", media:"images", src:["assets/lls-1.png","assets/lls-2.png"], live:true, buy:"https://squishlabs.store",
    desc:"LLS stands for Looks Like Shit. Six rackable, stackable units, Comp, EQ, Tape, Reverb, Delay, Distortion, each one looking like it was drawn by the lil bro you never wanted but sounding like it went to <b>Berklee</b> (and won't shut up about it). Every meter has a strip of tape slapped over it that says: use ur ears. Because honestly, you should.",
    stack:"JUCE 8 · AU / VST3 / Standalone · FET compression · FDN reverb · Tape saturation · Lemon Squeezy API · macOS / Windows",
    case:{
      problem:"Plugin UIs have turned into a beauty contest. Everyone's fighting to make the best looking plugin, glowy knobs, glass reflections, 4K vector everything, and somewhere in that arms race, sound and function took a back seat. Which is kinda wild, because that's the entire point of a plugin.",
      build:"A native <b>JUCE</b> plugin models six pieces of classic hardware, an 1176 comp, Pultec EQ, reel tape, Lexicon 224 reverb, Copicat echo and DS-1 distortion, as a reorderable serial chain with real DSP: 4× oversampled FET compression, an 8-line modulated FDN reverb, wow/flutter tape saturation. All wrapped in hand-drawn, childlike doodle graphics that animate with every control.",
      api:"Ships as a universal macOS (Intel + Apple Silicon) and Windows build in <b>AU</b>, <b>VST3</b> and Standalone formats. Licensing runs on the <b>Lemon Squeezy</b> API: a one-time purchase activates and binds to a machine, then works fully offline via a fingerprint-bound cached record, with silent background re-validation so a seat can be revoked remotely."
    }},

  { name:"Echo Map", tag:"Web App", media:"images", src:["assets/echomap-1.png","assets/echomap-2.png","assets/echomap-3.png","assets/echomap-4.png","assets/echomap-5.png","assets/echomap-6.png","assets/echomap-7.png"], live:true,
    desc:"Reaction intelligence for artists. Mines replay heatmaps, timestamped comments and skip data from an artist's released catalog to learn exactly which moments make fans replay, comment and stay. That learned \"fan fingerprint\" is then used to score unreleased drafts, predicting a reaction curve before a single listener hears the song. Echo Map never writes or suggests music; it only tells artists what their audience has already proven it loves.",
    stack:"YouTube Data API · Spotify for Artists · Spotify Web API · Reaction modeling · Scheduled ingestion",
    case:{
      problem:"Every release already comes with a verdict: replay spikes, comments and skip cliffs scattered across platforms. None of it connects back to the creative choices that caused it, so each new track ships as a guess.",
      build:"Echo Map aligns reaction signals (replay density, comments, skip curves) against extracted musical features across an artist's catalog. A model ranks the results into a fan fingerprint, then scores new drafts against it to forecast a reaction curve.",
      api:"Echo Map connects to the <b>YouTube Data API</b> for replay heatmaps and timestamped comments, and to <b>Spotify for Artists</b> / the <b>Spotify Web API</b> for streaming skip data. Ingestion runs on a schedule, keeping each fingerprint current. Draft analysis runs on demand: upload a track, get a scored prediction back in seconds, no DAW or distributor changes required."
    }},

  { name:"ElevenIdeas", tag:"VST", media:"video", src:"assets/elevenideas-demo.mp4", live:true,
    desc:"Lives inside your DAW and turns a single clip into eleven finished, song-aware ideas: new melodies, rewritten hooks, alternate deliveries, harmonies, the same line re-sung in a cloned voice. A companion plugin, ElevenBrain, sits on your master bus listening to key, tempo, energy and tone, and shapes every result. Built on <b>ElevenLabs</b> Music v2, Voice Changer, Voice Design and Audio Isolation.",
    stack:"ElevenLabs API · DAW plugin · Music generation · Voice cloning · Sound effects",
    case:{
      problem:"Generating a real alternative to a vocal take, a new melody, a harmony, a re-sung line in another voice, usually means leaving the DAW entirely.",
      build:"A companion plugin, ElevenBrain, sits on the master bus listening to key, tempo, energy and tone in real time, and that context shapes every idea the main plugin generates from a selected clip.",
      api:"Built across five <b>ElevenLabs</b> endpoints in one session: Music v2 for new melodic material, Voice Changer and Voice Design for alternate deliveries and cloned re-sings, Sound Effects for transitions, and Audio Isolation to isolate and transcribe the source clip first. Every idea locks to the project grid and drags straight onto the timeline."
    }},

  { name:"Patch", tag:"VST", media:"video", src:"assets/patch-demo.mp4", live:true,
    desc:"Turns any sound into a real, editable synth patch. Describe what you're after, say \"synth lead from Sandstorm\", and Patch reasons its way to a matching patch from synths you already own. Or drop in a sample: it analyzes the actual character (brightness, harmonics, attack, width) and reconstructs it as a live instrument that drops straight onto a Logic Pro channel strip.",
    stack:"FFT · Spectral analysis agent · Claude · JUCE · Logic Pro",
    case:{
      problem:"A sampled sound is frozen. You can trim and pitch it, but you can't turn its filter or push its drive, because it was never a synth to begin with.",
      build:"An FFT-based spectral analyzer extracts brightness, harmonics, attack and stereo width from any source, a sample or a text prompt, and a dedicated spectral analysis agent maps those features onto the parameters of synths you already own.",
      api:"<b>Claude</b> reasons from a text description straight to a parameter set. The result isn't a rendered sample: it's a genuine hosted synth instance dropped onto a real <b>Logic Pro</b> channel strip, with every parameter still live and automatable."
    }},

  { name:"RADA/R", tag:"Web App", media:"image", src:"assets/radar-demo.png", live:true,
    desc:"Sound-first trend detection for A&amp;R. Ingests emerging tracks daily from Deezer charts, editorial playlists, iTunes and Reddit, then embeds each 30-second preview with <b>CLAP</b>, listening to the sound itself rather than metadata. Clusters surface which sonic styles are rising from the ground up, with per-sound share velocity and <b>Claude</b> analyst notes, regenerated every day.",
    stack:"CLAP · Semantic embeddings · Claude · Deezer / Apple / Reddit APIs · Trend detection",
    case:{
      problem:"Chart-based A&amp;R tools like Chartmetric and Soundcharts show what's already popular. By the time a sound shows up there, it isn't emerging anymore.",
      build:"A daily ingestion job pulls fresh tracks from Deezer charts, editorial playlists, iTunes and Reddit music communities, embeds each 30-second preview with <b>CLAP</b>, and clusters those embeddings to find sonic styles gaining traction from the audio itself, not the metadata.",
      api:"Ingestion is wired directly against the <b>Deezer</b>, <b>Apple/iTunes</b> and <b>Reddit</b> APIs. Each day's clusters are handed to <b>Claude</b>, which writes the analyst notes per sound family plus a running accuracy log. The pipeline regenerates and redeploys on a daily schedule."
    }},

  { name:"GrooveDNA", tag:"VST", media:"images", src:["assets/groovedna-1.jpg","assets/groovedna-2.jpg","assets/groovedna-3.jpg","assets/groovedna-4.jpg"], live:true,
    desc:"An AU/VST3 drum sampler that curates its own kits. Type a drummer or a vibe (\"Questlove but tighter\") and <b>Claude</b> reasons out the swing, ghost-note placement and kit balance that phrase implies, then drives a live search against <b>Splice's MCP server</b> for one-shots matching each drum voice. Not happy? Argue with it in plain text and it refines the search instead of restarting.",
    stack:"AU / VST3 · JUCE · Claude · Splice MCP · Sample curation · macOS",
    case:{
      problem:"Building a drum kit from scratch means hours of trawling sample packs for a kick, snare and hat that actually sit together.",
      build:"Type a drummer or a vibe and <b>Claude</b> reasons out the swing, ghost-note placement and kit balance that phrase implies, structured as a query for each drum voice: kick, snare, hats, toms, clap, perc.",
      api:"That reasoning drives a live search against <b>Splice's MCP server</b>, which exposes sample search as tool calls Claude can invoke directly, sourcing each voice individually. Arguing back in plain text refines the same search instead of restarting it, on a real-API-with-offline-fallback architecture so a dropped connection falls back to a local cache rather than breaking the session. Ships as a <b>JUCE</b> AU/VST3 plugin."
    }},

  { name:"LNE (Last Night's Ears)", tag:"VST", media:"images", src:["assets/lne-1.jpeg","assets/lne-2.jpeg","assets/lne-3.jpeg"], live:true,
    desc:"Last Night's Ears models your hearing fatigue in real time and plays back the inverse, so the mix you judge at 1am is the mix tomorrow's ears will actually hear. Long sessions quietly recalibrate your ears to whatever your mix is hammering hardest. LNE tracks that fatigue session to session and can measure your actual hearing with a 30-second probe. Flip Fresh Ears before you commit to a decision.",
    stack:"JUCE · AudioUnit · auval · Fatigue modeling · Spectral analysis · macOS",
    case:{
      problem:"Mixing at night, your ears adapt to fatigue. The balance that sounds right after hours reads wrong on fresh ears in the morning, and by then it's printed.",
      build:"A native <b>JUCE</b> AudioUnit on the monitor bus models your hearing fatigue and applies the inverse live, blending a fatigue-curve model, your mix's own spectrum, and an optional 30-second ear probe. Fresh/Now toggle is loudness-matched so the comparison is tone, not level.",
      api:"Ships as a universal macOS <b>AudioUnit</b>, validated with <b>auval</b> and integrated into Logic and other AU hosts. Your hearing profile persists across sessions in a local JSON baseline, carried forward project to project. Monitor-only by design: <b>isNonRealtime()</b> hard-bypasses offline bounces automatically, so nothing you print is ever touched."
    }},

  { name:"UnderTone", tag:"VST", media:"image", src:"assets/undertone-demo.png", live:true,
    desc:"Listens to every take of your vocal and hears what you're actually going for. Pick a feeling from 21 options like desperate, tender or triumphant, and it lights up which take nailed it, phrase by phrase, down to a single word. No cloud, no lyrics required. Click a waveform to hear it, drag to comp straight onto the timeline.",
    stack:"Vocal comping · Emotional analysis · Local processing · Claude · DAW plugin · macOS",
    case:{
      problem:"Comping the best phrase out of a dozen vocal takes usually means scrubbing through all of them from memory, guessing which one had the right feeling.",
      build:"A local emotional-analysis model scores every take against 21 feelings, desperate, tender, triumphant and others, at the phrase level and down to individual words, then lights up whichever take best matches the one you picked.",
      api:"Everything runs locally against the audio itself: no cloud calls, no lyrics or transcription required. It ships as a DAW plugin: click a waveform to preview, drag to select a slice, and drop your comp straight onto the timeline."
    }},

  { name:"Blueprint", tag:"Web App", media:"video", src:"assets/blueprint-demo.mp4", live:true,
    desc:"Arrangement intelligence for your DAW. Drop in any track and Blueprint analyzes section structure, key, tempo, dynamics and instrumentation, then drafts a session-ready arrangement scaffold. Export as a standard MIDI marker file into Logic, Cubase, Studio One or Reaper. Under the hood: Google's <b>YAMNet</b> and a custom spectral analyzer identify instrumentation, <b>Claude</b> writes the arrangement.",
    stack:"C++ / JUCE 8 · YAMNet · Spectral DSP · Claude · MIDI markers · macOS",
    case:{
      problem:"Deconstructing a reference track's arrangement, or breaking through your own arrangement block, means manually mapping sections and markers by ear.",
      build:"A native <b>C++/JUCE 8</b> engine runs Google's <b>YAMNet</b> neural network for instrumentation identification alongside a custom spectral DSP analyzer for section structure, key, tempo and dynamics, entirely on-device.",
      api:"Those signals are handed to <b>Claude</b>, which writes the arrangement scaffold. Export is a standard MIDI marker file that drops straight into Logic, Cubase, Studio One or Reaper, or as text markers for Ableton Live and FL Studio. The interface is a dependency-free web UI embedded in the native app."
    }},

  { name:"Sumi", tag:"VST", media:"video", src:"assets/sumi-demo.mp4", live:true,
    desc:"A reverb you paint, not dial in. Brush ink onto a canvas and the stroke becomes the impulse response, fast and dry for a tight room, slow and heavy for a cathedral tail. A live fluid simulation drives real convolution, synthesized and rendered in real time. Five masterworks ship built in as playable spaces.",
    stack:"Convolution · Fluid simulation · IR synthesis · JUCE 8 · VST3 / AU · Standalone",
    case:{
      problem:"Reverb plugins ask you to reason in numbers (pre-delay, decay, diffusion) when what you actually want is a feeling: a room, a distance, a texture.",
      build:"Every ink stroke is converted into a vector field, then run through a real-time fluid simulation. The simulation's output becomes the impulse response, synthesized live rather than pulled from a sample library, so a fast dry stroke and a slow heavy one produce genuinely different spaces.",
      api:"The IR feeds a true convolution engine built on <b>JUCE 8</b>'s DSP module, processing in real time inside the plugin's audio callback. No external API; the whole signal chain runs on-device. One codebase compiles to <b>VST3</b>, <b>AU</b> and a standalone app."
    }},

  { name:"slopworthy.xyz", tag:"Web App", media:"image", src:"assets/slopworthy-demo.png", live:true, url:"https://slopworthy.xyz",
    desc:"Tells vibecoders whether their genius idea already exists. Paste in your idea and get an honest read on whether it's a breakthrough or the fortieth to-do app in a trench coat. It won't stop you building it, just quietly note that 500 people beat you there. <a href=\"https://slopworthy.xyz\" target=\"_blank\" rel=\"noopener\">slopworthy.xyz →</a>",
    stack:"LLM judgment · Idea validation · Web app · Claude",
    case:{
      problem:"Every vibecoder thinks their app idea is original. Most aren't, and there was no fast, honest way to check.",
      build:"Originally ran on a fixed database of 12 categories; now an LLM reads the idea directly and reasons about whether it's genuinely new or the fortieth to-do app in a trench coat.",
      api:"A single <b>Claude</b> call takes the pasted idea and returns a verdict with reasoning, no database lookup required. Ships as a small, fast web app at <a href=\"https://slopworthy.xyz\" target=\"_blank\" rel=\"noopener\">slopworthy.xyz</a>."
    }},
];

const MORE = [
  { name:"BetMe", tag:"Web App",
    desc:"A social challenge app where friends stake real money on real-world dares. The hard part isn't the wager, it's <b>proving the challenge actually happened</b>. The video judge is Gemini's native video API, fed the clips plus a category rubric, returning schema-enforced JSON (observation, then reasoning, then verdict and confidence) so reasoning can't drift to fit a pre-picked outcome.",
    stack:"Gemini 2.5 Flash/Pro · Native video API · Schema-enforced JSON · React Native",
    build:"Uploaded clips plus a category-specific rubric prompt go into Gemini's native video API; observation, then reasoning, then a verdict with a 0 to 100 confidence score come out. Bets above the confidence threshold auto-resolve; the rest route to a human." },
  { name:"Stella Says", tag:"Application",
    desc:"A local-first desktop app that lets anyone direct AI coding agents <b>without touching a terminal</b>. Wraps Claude (plus optional providers) in a plain-language interface, running real Plan and Agent sessions against your files with live tool execution you can watch and steer. Parallel isolated git workspaces.",
    stack:"Agent orchestration · LLM tooling · Full-stack · Design systems",
    build:"Each workspace runs as its own isolated git worktree, so parallel tasks never collide. The interface streams tool calls and file edits from a real agent session as they happen, turning what would normally be terminal output into a plain-language, watchable feed." },
  { name:"LockedIn", tag:"Web App",
    desc:"A job marketplace where employers deposit real stablecoins into escrow before a listing goes live. Seekers apply knowing <b>every posting is backed by actual money</b>; funds release automatically once a hire is verified. Runs on Base with automated screening and multi-signal hire verification.",
    stack:"Stablecoin escrow · Base · Automated screening · Hire verification",
    build:"Employer funds sit in a stablecoin escrow contract on <b>Base</b> before a listing can go live. A verification step checks multiple signals to confirm an actual hire before the contract is authorized to release funds automatically." },
  { name:"GasBuddy", tag:"iOS App",
    desc:"A UK fuel-price iOS app showing drivers the <b>cheapest nearby petrol, diesel or premium</b>, sourced live from CMA-mandated retailer feeds. Ranks stations by price or distance on a map, with a homescreen widget for glanceable prices.",
    stack:"SwiftUI · iOS · MapKit · Live CMA feeds · Homescreen widget",
    build:"Ingests the UK's CMA-mandated live fuel-price feeds, ranks nearby stations by price or distance on a MapKit view, and mirrors the same data to a homescreen widget so prices are glanceable with the app closed." },
  { name:"Various Tools", tag:"VSTs & Web Apps",
    desc:"Purpose-built <b>internal tools</b> for GTM, BD, partnerships and strategy, plus creative audio plugins from distortion units to key-tracking modulated reverbs and delays. Available to demo on a call.",
    stack:"GTM · BD · Partnerships · Strategy · Audio plugins",
    build:"Mostly small, purpose-built scripts and plugins solving one specific GTM, BD or partnerships problem at a time, plus a handful of creative audio plugins built the same way. All demoable on a call." },
];

/* ---------------- MUSIC GRID DATA ---------------- */
const WORKS = [
  {t:"My Universe", a:"Coldplay, BTS", img:"https://i.scdn.co/image/ab67616d0000b273ec10f247b100da1ce0d80b6d"},
  {t:"Nothing Breaks Like a Heart", a:"Mark Ronson, Miley Cyrus", img:"https://i.scdn.co/image/ab67616d0000b273de087ae2924d2c1654f60d74"},
  {t:"Higher Power", a:"Coldplay", img:"https://i.scdn.co/image/ab67616d0000b2738af1d785b38ed4b769c24659"},
  {t:"Hackney Diamonds", a:"The Rolling Stones", img:"https://i.scdn.co/image/ab67616d0000b273683680975bf153c97ea8ad8d"},
  {t:"Dream Girl Evil", a:"Florence + The Machine", img:"https://i.scdn.co/image/ab67616d0000b2735fd9e21618182df7d70b2186"},
  {t:"Solo", a:"Clean Bandit, Demi Lovato", img:"https://i.scdn.co/image/ab67616d0000b27367eda217860e86c43481a5cb"},
  {t:"Point and Kill", a:"Little Simz", img:"https://i.scdn.co/image/ab67616d0000b273aede85ed28c2237a33b63dba"},
  {t:"Solid Ground", a:"Michael Kiwanuka", img:"https://i.scdn.co/image/ab67616d0000b27360ada139840fb439d6750f27"},
  {t:"I See You", a:"The xx", img:"https://i.scdn.co/image/ab67616d0000b273fa132d6237850ac3f29e3af3"},
  {t:"Lost Without You", a:"Freya Ridings", img:"https://i.scdn.co/image/ab67616d0000b273692701741cd800811b944be9"},
  {t:"mother tongue", a:"Bring Me The Horizon", img:"https://i.scdn.co/image/ab67616d0000b27349e3b7e85829da2fbc68bc46"},
  {t:"Futureproof", a:"Nothing But Thieves", img:"https://i.scdn.co/image/ab67616d0000b273e0efd8bb1f9943c40a6e5897"},
];
