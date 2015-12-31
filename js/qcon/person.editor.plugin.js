/**
 * Created by oliver on 17/08/2015.
 */

var ElementFactory = {

    createInput : function(id, labelText, model){


        var container = document.createElement('div');

        var label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerHTML = labelText;

        var input = document.createElement('input');
        input.setAttribute('id', id);
        input.setAttribute('class', 'form-control');
        input.setAttribute('type', 'text');

        input.addEventListener('change', function(event){
            model[event.target.id] = event.target.value;
        });

        container.appendChild(label);
        container.appendChild(input);

        return container;
    },

    createButton : function(text){
        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'btn btn-success');
        button.innerHTML = text;
        return button;
    }

};

function PersonEditor(saveCallback){

    var __personData = {};
    var __saveCallback = saveCallback;

    this.render = function(target){

        var form = document.createElement('form');

        var inputFirstName = ElementFactory.createInput('firstName', "First Name", __personData);
        var inputLastName = ElementFactory.createInput('lastName', "Last Name", __personData);
        // ...
        var saveButton = ElementFactory.createButton('Save');
        saveButton.addEventListener('click', function(event){
           __saveCallback(__personData);
        });

        form.appendChild(inputFirstName);
        form.appendChild(inputLastName);
        form.appendChild(saveButton);

        target.appendChild(form);

    }

}


(function($){
    $.fn.personEditor = function(saveCallback){
        this.each( function() {
            var editor = new PersonEditor(saveCallback);
            editor.render(this);
        });
    };
})(jQuery);