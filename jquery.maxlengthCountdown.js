/**
 *   jQuery maxlength-countdown
 *   Adds a "remaining characters" counter after any field with maxlength field.
 *
 *   Copyright 2013 Matt Baer
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
(function($) {
    $.fn.maxlengthCountdown = function(options) {
        var defaults = {
            countClass: 'count-me-down',
            suffixText: '',
            suffixTextSingular: '',
            before: true,
        };
        
        options = $.extend(defaults, options);
        
        // Handle case of only singular form is needed
        if (options.suffixText !== '' && options.suffixTextSingular === '') {
            options.suffixTextSingular = options.suffixText;
        }

        return this.filter('input').not('[type=checkbox], [type=radio]').each(function() {

            var $input = $(this),
                $counter;
            var maxlength = $input.attr('maxlength');
            
            var addCounter = function() {
                // Create counter in given position
                if (options.before) {
                    $input.before('<div />');
                    $counter = $input.prev('div');
                } else {
                    $input.after('<div />');
                    $counter = $input.next('div');
                }
                
                // Populate counter
                $counter.addClass(options.countClass).text(maxlength + ' ' + options.suffixText);
            };
            
            var removeCounter = function() {
                // Remove counter in given position
                $counter.remove();
            };
            
            var countMe = function() {
                var left = maxlength - $input.val().length;
                $counter.text( left + ' ' + (left === 1 ? options.suffixTextSingular : options.suffixText) );
            };

            // Only need a counter if input has maxlength
            if (maxlength !== undefined && maxlength > 0) {
                    // Add counter, bind changing event
                    addCounter();
                    $input.on('keyup blur', countMe);
            }
        });
    };

})(jQuery);
