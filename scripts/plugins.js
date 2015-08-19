(function(exports) {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];

    exports.name = function(number) {
        return names[number];
    };
    exports.number = function(name) {
        return names.indexOf(name);
    };

    jQuery(document).ready(function () {
        var bulkPluginSelector = jQuery('#farmer__bulkPluginSelect');
        bulkPluginSelector.chosen({
            search_contains: true
        });
        bulkPluginSelector.change(function () {
            jQuery(".bulkButton").prop('disabled',false);
        });

        var animalSelector = jQuery('#farmer__animalSelect');
        animalSelector.chosen({
            search_contains: true
        });
        animalSelector.change(function () {
            console.log('change event received');
            var animal = animalSelector.val();
            jQuery.post(
                DOKU_BASE + 'lib/exe/ajax.php',
                {
                    call: 'plugin_farmer_' + animal
                },
                function(data) {
                    alert('Received response ' + JSON.stringify(data,null,2));
                    // data is array you returned with action.php
                },
                'json'
            );
        });
        jQuery("input[name=bulkSingleSwitch]:radio").change(function () {
            if (jQuery('#farmer__bulk').prop("checked")) {
                jQuery('#farmer__bulkForm').css('display','initial');
            } else {
                jQuery('#farmer__bulkForm').css('display','none');
            }
            if (jQuery('#farmer__single').prop("checked")) {
                jQuery('#farmer__singlePluginForm').css('display','initial');
            } else {
                jQuery('#farmer__singlePluginForm').css('display','none');
            }
        });
    });

})(this.farmer__plugins = {});
