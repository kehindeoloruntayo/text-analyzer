// Business Logic
  let offensiveWords = ['zoinks', 'muppeteer', 'biffaroni', 'loopdaloop', 'nigga', 'fuck', 'bastard'];

  function getWordsFromText(text) {
    let words = text.toLowerCase().split(' ')
      .map(word => word.trim())
      .filter(word => word.length > 0);
    return words;
  }  

  function getMostCommonWords(text) {
    // Remove offensive words
    text = removeOffensiveWords(text);

    // Extract words from the text
    let words = getWordsFromText(text);

    // Count the occurrences of each word
    let wordCounts = {};
    words.forEach(function(word) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    // Sort the words by count in descending order
    let sortedWords = Object.keys(wordCounts).sort(function(a, b) {
      return wordCounts[b] - wordCounts[a];
    });

    // Get the three most common words
    let mostCommonWords = sortedWords.slice(0, 3).map(function(word) {
      return { word: word, count: wordCounts[word] };
    });

    // Append most common words to the UI
    appendMostCommonWords(mostCommonWords);

    return text;
  }
  
  function appendMostCommonWords(words) {
    $("#mostUsed").empty();
    words.forEach(function(word) {
      $("#mostUsed").append(word.word + ": " + word.count + "<br>");
    });
  }
  

  function removeOffensiveWords(text) {
    offensiveWords.forEach(function(word) {
      let censorPattern = '*'.repeat(word.length);
      let index = text.toLowerCase().indexOf(word.toLowerCase());
      while (index !== -1) {
        text = text.substring(0, index) + censorPattern + text.substring(index + word.length);
        index = text.toLowerCase().indexOf(word.toLowerCase(), index + censorPattern.length);
      }
    });
    return text;
  }

  function boldPassage(text, searchWord) {
    text = removeOffensiveWords(text);
    let words = text.split(" ");
    let boldedWords = [];
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (word.toLowerCase().includes(searchWord.toLowerCase())) {
        let startIndex = word.toLowerCase().indexOf(searchWord.toLowerCase());
        let endIndex = startIndex + searchWord.length;
        let boldedWord = word.substring(0, startIndex) + "<b>" + word.substring(startIndex, endIndex) + "</b>" + word.substring(endIndex);
        boldedWords.push(boldedWord);
      } else {
        boldedWords.push(word);
      }
    }
    return boldedWords.join(" ");
  }

  function wordCounter(text) {
    if (text.trim().length === 0) {
      return 0;
    }
    const wordArray = text.split(" ").filter(word => word.trim().length > 0 && isNaN(word));
    return wordArray.length;
  } 
  
  function numberOfOccurrencesInText(word, text) {
    if ((text.trim().length === 0) || (word.trim().length === 0)) {
      return 0;
    }
    const wordArray = text.split(" ");
    let wordCount = 0;
    wordArray.forEach(function(element) {
      if (element.toLowerCase().includes(word.toLowerCase())) {
        wordCount++;
      }
    });
    return wordCount;
  }
  
  // UI Logic
  $(document).ready(function(){
    $("form#word-counter").submit(function(event){
      event.preventDefault();
      const passage = $("#text-passage").val();
      const word = $("#word").val();
      const commonWords = getMostCommonWords(passage);
      const boldedPassage = boldPassage(passage, word);
      const wordCount = wordCounter(passage);
      const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
      $("#total-count").html(wordCount);
      $("#selected-count").html(occurrencesOfWord);
      $("#bolded-passage").html(boldedPassage);
      $('passage').html(commonWords);
  });
});

  