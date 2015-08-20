(function() {
  $(document).on('ready', function() {
    var availableTags;
    availableTags = ['ActionScript', 'AppleScript', 'Asp', 'BASIC', 'C', 'C++', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala', 'Scheme'];
    return $("#txtSearch").autocomplete({
      source: availableTags
    });
  });

}).call(this);
