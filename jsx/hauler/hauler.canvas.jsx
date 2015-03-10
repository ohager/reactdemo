define(['react', 'restservice/generic.service',
		'component/cardscontrol',
		'component/editor.frame',
		'component/customer/customer.editor',
		'component/card.list',
		'component/customer/customer.card',
		'component/more.button',
		'component/details/details.list',
        'component/mixins/mixin.fullsize.editor',
		'component/mixins/mixin.actionprovider'
       ],

	function (React, GenericService, CardsControl, EditorFrame, CustomerEditor, CardList, CustomerCard, MoreButton, DetailsList, MixinFullSizeEditor, MixinActionProvider) {

		var HaulerCanvas = React.createClass({

          mixins: [MixinFullSizeEditor,MixinActionProvider],
          
           getInitialState: function () {
              return { }
            },

			createCategoryCardClass: function () {
				return CustomerCard; // todo: make more consistent
			},

			render: function () {
               
				return (
					<div className="row">
						<div className={this.getEditorWidthClass()}>
							<div className="panel panel-default">

								<div className="panel-body">
									<section className="section-search">
										<CardsControl editorId="slider" className="animation" onToggle={this.toggleEditorSize}  />
									</section>

									<section className="section-add-item ">
										<div id="slider" className="animation" >
											<EditorFrame>
												<CustomerEditor tipoCustomer="TRANSPORTADORA"/>
											</EditorFrame>
										</div>
									</section>

									<section className="section-container-cards">
										<CardList cardContentClass={this.createCategoryCardClass()} restService={new GenericService('/customer/transportadora')} cardItemClass='card-item-customer'/>
									</section>
								</div>

								<div className="panel-footer clearfix">
									<MoreButton text="Carregar"/>
								</div>

							</div>
						</div>
						<div className={this.getDetailWidthClass()}>
							<div className="row">
								<div className="col-xs-12 col-sm-12">
									<section className="section-details">
										<DetailsList actions = {this.ActionProvider.getActions()}/>
									</section>
								</div>
							</div>
						</div>
					</div>
				)
			}
		});

		return HaulerCanvas;

	});

