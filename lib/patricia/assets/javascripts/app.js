$(document).ready(function() {

  // Helpers

  $.fn.elementText = function() {
    var str = '';
    $(this).contents().each(function() {
      if ($(this).nodeType == 3) {
        str += $(this).textContent || $(this).innerText || '';
      }
    });
    return str;
  };


  // Sidebar expanding

  var self = $(this);
  self.sidebarExpanded = false;
  self.originalSidebarStyle = {
    'width': '',
    'position': '',
    'box-shadow': '',
  };
  self.originalSidebarLeftMargin = parseInt($('#p-sidebar').css(
    'margin-left'));
  self.sidebarLeftMarginAnimationWidth = 10;
  self.sidebarExpandedStyle = {
    'width': '80%',
    'right': '20px',
    'position': 'absolute',
    'box-shadow': '0 0 0 9999px rgba(0, 0, 0, 0.3)',
  };
  self.sidebarWidthToggleOriginalText =
    $('#p-sidebar-width-toggle').text();
  self.sidebarWidthToggleExpandedText = 'Narrow sidebar';

  self.toggleSidebarWidth = function() {
    if (self.sidebarExpanded) {
      self.sidebarExpanded = false;
      $('#p-sidebar-width-toggle')
        .text(self.sidebarWidthToggleOriginalText);
      $('#p-sidebar').css(self.originalSidebarStyle);
    } else {
      self.sidebarExpanded = true;
      $('#p-sidebar-width-toggle')
        .text(self.sidebarWidthToggleExpandedText);
      $('#p-sidebar').css(self.sidebarExpandedStyle);
    }
  };

  $('#p-sidebar-width-toggle').click(function(e) {
    e.preventDefault();
    self.toggleSidebarWidth();
  });

  // Collapse the sidebar when clicking on a link while the sidebar is
  // expanded. So when hitting the back button the sidebar will be
  // collapsed. This is moreintuitive.
  $('#toc a').click(function() {
    if (self.sidebarExpanded) {
      self.toggleSidebarWidth();
    }
  });

  // Keybinding
  $('body').append(
    '\
<div id="help-box">\
<p class="text-right"><a class="btn btn-default btn-xs help-box-toggle"\
href="/">Close</a></p>\
<h2 class="text-center">Key bindings</h2>\
<br/>\
<p><code>?</code><span>: Toggle key bindings help</span></p>\
<p><code>w</code><span>: Toggle sidebar width</span></p>\
<p><code>s</code><span>: Select sidebar search box</span></p>\
<p><code>Esc</code><span>: Unselect sidebar search box</span></p>\
</div>\
'
  );
  self.helpBox = $('#help-box');
  self.helpBox.hide();
  self.helpBox.css({
    'position': 'fixed',
    'background-color': '#FAFAFA',
    'color': '#686868',
    'top': '50%',
    'left': '50%',
    'width': '500px',
    'height': '400px',
    'margin-left': '-200px',
    'margin-top': '-300px',
    'z-index': '9999',
    'padding': '10px',
    'box-shadow': '0 0 0 9999px rgba(0, 0, 0, 0.2)',
    'border': '1px solid #ACACAC',
  });
  $('#p-sidebar-search-box').parent().find('a:first').parent().prepend('\
<a href="/" class="text-muted btn-xs help-box-toggle">Key bindings\
</a>');
  $('.help-box-toggle').click(function(e) {
    e.preventDefault();
    self.helpBox.toggle();
  })
  $(document).keypress(function(e) {
    // 119: w   - Toggle sidebar width
    // 115: s   - Select sidebar search box
    // 0:   Esc - Unselect sidebar search box
    // 63:  ?   - Toggle key bindings help
    if (e.target.nodeName != 'INPUT' && e.target.nodeName != 'TEXTAREA') {
      if (e.which == 119) {
        self.toggleSidebarWidth();
      } else if (e.which == 115) {
        $('#p-sidebar-search-box').select();
      } else if (e.which == 63) {
        $('#help-box').toggle();
      }
    } else if (e.target.id == 'sidebar-search-box') {
      if (e.which == 0) {
        $('#p-sidebar-search-box').blur();
      }
    }
  });


  // Skip `Key bindings' and `Widen sidebar' links when navigation using
  // TAB.
  $('#p-sidebar-search-box').parent().find('a').slice(0,2)
    .each(function(index) {
      $(this).attr('tabindex', '9999');
      // Add tooltips
      var title = '';
      if (index == 0) {
        title = 'Shortcut: "?"';
      } else if (index == 1) {
        title = 'Shortcut: "w"';
      }
      $(this).attr('title', title);
      $(this).attr('data-toggle', 'tooltip');
      $(this).attr('data-placement', 'top');
    });


  // Search

  $('#p-sidebar-search-box').keyup(function() {
    var filter = $(this).val().toLowerCase();

    $('#p-sidebar li').each(function() {
      var text = $(this).text().toLowerCase();

      if (text.match(filter)) {
        $(this).show()
      } else {
        $(this).hide();
      }
    });
  });

});
