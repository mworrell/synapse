class Person extends Backbone.Model
    defaults:
        onTwitter: false


class PersonCollection extends Backbone.Collection
    model: Person
    url: './people.json'


class PersonView extends ObservableView
    bindings:
        '[name=first-name]':
            keyup:
                observes: 'firstName'
                interface: 'value'

        '[name=last-name]':
            keyup:
                observes: 'lastName'
                interface: 'value'
                loopback: false

        'input[type=checkbox]':
            change:
                observes: 'onTwitter'
                interface: 'checked'

        '.name':
            noevent:
                observes: ['firstName', 'lastName']
                interface: 'html'
                receive: 'getFullName'

        '.onTwitter':
            noevent:
                observes: 'onTwitter'
                interface: 'visible'

        '[type=checkbox]':
            noevent:
                observes: 'firstName=disabled'
                interface: 'prop'
                receive: (value) ->
                    !Boolean(value)

        '.date':
            noevent:
                observes: ['firstName', 'lastName', 'onTwitter']
                interface: 'text'
                receive: 'getDate'

    initialize: (options) ->
        @render(options.template)
        @setupBindings()

    render: (template) ->
        @el = $ template(date: new Date)

    getFullName: =>
        if @model.get('firstName') or @model.get('lastName')
            first = @model.get('firstName') or ''
            last = @model.get('lastName') or ''
            return first + ' ' + last
        '<span style="color: #aaa; font-style:italic">(fill out name fields)</span>'

    getDate: =>
        new Date


class PersonCollectionView extends ObservableView

    initialize: (options) ->
        @el = $('#people')
        @template = options.template
        @collection = new PersonCollection

        @collection.bind 'refresh', (collection) =>
            @collection.each (model) =>
                @addPerson model

        @collection.bind 'add', (model) =>
            @addPerson model

        @collection.fetch()

        $('#add-person').bind 'click', @createPerson

    createPerson: =>
        model = new Person
        @collection.add(model)

    addPerson: (model) =>
        view = new PersonView
            template: @template
            model: model

        @el.prepend(view.el)

# initialize..
$ ->
    template = _.template $('#template').html()
    new PersonCollectionView
        template: template
