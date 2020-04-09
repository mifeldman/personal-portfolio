const lyrics = [
    'Thinking of you till it hurts',
    'I wish I could carry your smile in my heart',
    "I'm all out of love, I'm so lost without you",
    'I know you were right, believing for so long',
    "I'm all out of love, what am I without you",
    "I'm reaching for you, are you feeling it too?",
    'Does the feeling seem oh, so right?',
    "Please love me or I'll be gone, I'll be gone",
    "Girl you're every woman in the world to me",
    "you're my fantasy, you're my reality",
    "you're everything I need",
    "Everything good, everything fine, that's what you are",
    "I'm living a lifetime in every minute that we're together",
    "And I'm stayin right here forever",
    'Those thoughts of you keep taunting me',
    'Holding you, a feeling I never outgrew',
    'Only you can fill that space inside',
    "And I just can't go on without you",
    "I just can't live without you",
    'I miss everything about you',
    "It's just no good without you",
    'Then you came to me',
    'And my loneliness left me',
    'Even the nights are better',
    "Now that we're here together",
    'You, you knew just what to do',
    'And you did more, than mend a broken heart',
    "Cause now you've made a fire start",
    "I never dreamed there'd be, someone to hold me until you",
    "Thinking of you when you're not here",
    'I want to share it with you',
    'Close your eyes I want to ride the skies',
    'In my sweet dreams',
    'Close your eyes I want to see you tonight',
    "I'll think of your kiss as the days roll by",
    "And I'll write the words you love",
    'Will just have to wait till I get home',
    "Ooh there's not much time to tell you half the things I should",
    "Only that I'm so glad I fell in love with you",
    "And I'd do it again if I could",
    'I realize the best part of love is the thinnest slice',
    "I believe there's still much to believe in",
    'So lift your eyes if you feel you can',
    "Reach for a star and I'll show you a plan",
    "You know you can't fool me",
    "I've been loving you too long",
    "Lost In Love and I don't know much",
    'Was I thinking aloud and fell out of touch?',
    "But I'm back on my feet and eager to be what you wanted",
    'Then you smiled and I reached out to you',
    'One look then it all began for you and me',
    'The moment that we touched I knew that there would be',
    'Two less lonely people in the world',
    "And It's gonna be fine",
    'Out of all the people in the world',
    "I just can't believe you're mine",
    'In my life where everything was wrong',
    'Something finally went right',
    "Now there's two less lonely people",
    "But miracles come true, I know 'cause here we are",
    'Tonight I fell in love with you',
    'Love is everywhere, I know it is',
    'Such moments as this are too few',
    'Here I am, the one that you love',
    'Understand, the one that you love, loves you in so many ways',
    'Hold me in your arms for just another day',
    'And I know just where to touch you',
    'and I know just what to prove',
    'I know when to pull you closer',
    "and I'm never gonna tell you everything, I've got to tell you",
    "But I don't know how to leave you",
    'making love out of nothing at all',
    'Every time I see you all the rays of the sun',
    'are streaming through the waves in your hair',
    'and every star in the sky is taking aim',
    'at your eyes like a spotlight',
    "The beating of my heart is a drum, and It's lost",
    "and It's looking for a rhythm like you",
    'You can take the darkness from the pit of the night',
    'and turn it into a beacon burning endlessly bright',
    "I've got to follow it, 'cause everything I know, well It's nothing till I give it to you",
    'And I can make you every promise that has ever been made',
    'And I can make all your demons be gone',
    'I hold on to your body',
    'And feel each move you make',
    'Your voice is warm and tender',
    'A love that I could not forsake',
    'Cause you are my lady',
    'And I am your man',
    'Whenever you reach for me',
    "I'll do all that I can",
    'Never wonder where I am',
    'Cause I am always by your side',
    'And who am I to say, you should believe in me',
    'And who am I to say I love you',
    'So calm down love, it will be all right',
    'I want you to hold on to me',
    'And take me where I long to be',
    'But now it longs to be only with you',
    'Remember the words from my heart will always be true',
  ]

  console.log('Welcome to my poetry app!')

  let poemArea1 = document.querySelector('.poem1')
  let poemArea2 = document.querySelector('.poem2')

  const generate = () => {
    let firstHalf = lyrics.slice(0, 50)
    let secondHalf = lyrics.slice(50)

    poemArea1.value = getHalf(firstHalf)
    poemArea2.value = getHalf(secondHalf)
  }

  function getHalf(halfLyrics) {
    let halfPoem = ""
    let total = halfLyrics.length
    for (i = 0; i < total; i++) {
      let pick = Math.floor(Math.random() * total)
      const phrase = halfLyrics[pick]
      let upperPhrase = phrase.charAt(0).toUpperCase() + phrase.slice(1)
      halfLyrics.splice(pick, 1)
      console.log("We removed item " + pick + " from lyrics: " + halfLyrics)
      if((total % 4) == 0 ) {
        halfPoem = halfPoem + '\n' + upperPhrase + '\n'
      } else {
        halfPoem = halfPoem + '\n' + upperPhrase
      }
      total-- 
    }
    return halfPoem
  }

  let poemButton = document.querySelector('button')
  poemButton.addEventListener("click", generate);