# Refactor References

**This is a file with all classes that are either deprecated or in need of modifications**

Any class that uses, implements, extends, has an old stack test implementation, or includes
in your code somehow needs to be reviewed the need for refactoring.

**Obs:** Deprecated classes listed only on `deprecated` article

## DEPRECATED

Deprecated **CLASSES** or **FUNCTIONS**

```
Backend/module/Core/src/Core/Service/DateTime.php
Backend/module/Core/src/Core/Model/EntityManagerAwareInterface
Backend/module/Core/src/Core/Service/ResultFormatterInterface
Backend/module/Core/src/Core/Model/EntityManagerAwareTrait
Backend/module/Core/src/Core/BaseException
Backend/module/Application/src/Application/Initializer/Authenticated
Backend/module/Application/src/Application/Service/Sequence
Backend/module/Core/src/Core/Filter/EmptyToNull
Backend/module/Core/src/Core/Report/AbstractReport
Backend/module/Core/src/Core/Report/ChartReport
Backend/module/Core/src/Core/Service/DataFormatter
Backend/module/Core/src/Core/Service/FilterType
Backend/module/Core/tests/src/CoreTest/ConcreteDatabasesTestCase
Backend/module/Finance/src/Finance/Service/PaymentType
Backend/module/Fiscal/src/Fiscal/Service/AggregatedEntityGetterInterface
Backend/module/Application/tests/src/ApplicationTest/Helper/Client
Backend/module/Application/tests/src/ApplicationTest/Helper/User
Backend/module/Core/src/Core/Report/Column/Column
Backend/module/Core/src/Core/Report/Column/Factory
Backend/module/Core/src/Core/Report/Data/Data
Backend/module/Core/src/Core/Report/Data/DataRow
Backend/module/Core/src/Core/Report/Filter/Filter
Backend/module/Core/src/Core/Report/Summary/Calculator
Backend/module/Core/src/Core/Report/Summary/Factory
Backend/module/Core/src/Core/Report/Summary/HeaderSummary
Backend/module/Core/src/Core/Report/Summary/ListMode
Backend/module/Core/src/Core/Report/Summary/Point
Backend/module/Core/src/Core/Report/Summary/Summary
Backend/module/Core/src/Core/Report/Summary/TableSummary
Backend/module/Finance/src/Finance/Service/Flow/Credit
Backend/module/Finance/src/Finance/Service/Flow/Debit
Backend/module/Finance/src/Finance/Service/Flow/Deposit
Backend/module/Finance/src/Finance/Service/Flow/Expense
Backend/module/Finance/src/Finance/Service/Flow/Flow
Backend/module/Finance/src/Finance/Service/Flow/Revenue
Backend/module/Finance/src/Finance/Service/Flow/Transfer
Backend/module/Fiscal/tests/src/FiscalTest/Mock/NFEBuilderGateway
Backend/module/Fiscal/tests/src/FiscalTest/Mock/ToolsNFe
Backend/module/Payment/tests/src/PaymentTest/Helper/Payment
Backend/module/Core/src/Core/Service/QueryBuilder/Updater/Context
Backend/module/Application/src/Application/Service/Notification/Peer/UserCollector/AllStrategy
Backend/module/Fiscal/tests/src/FiscalTest/Service/NFE/Builder/ICMSBuilder/ICMS51BuilderTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/NFE/Builder/ICMSBuilder/ICMSSNBuilderTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/NFE/Builder/ICMSBuilder/ICMSSTBuilderTest
Backend/module/Application/src/Application/Model/Sequence
Backend/module/Application/src/Application/Model/User
Backend/module/Core/src/Core/Service/PaginatorInterface
Backend/module/Core/src/Core/Service/PaginatorTrait
Backend/module/Core/src/Core/Service/ParameterFactory
Backend/module/Core/src/Core/Service/ParameterSet
Backend/module/Core/src/Core/Service/ReferenceDateAwareInterface
Backend/module/Core/src/Core/Service/ReferenceDateAwareTrait
Backend/module/Core/src/Core/Service/Service
Backend/module/Core/src/Core/Service/ServiceRelatedInterface
Backend/module/Core/src/Core/Service/ServiceRelatedTrait
Backend/module/Fiscal/src/Fiscal/Model/NFEStatusTransmissao
Backend/module/Fiscal/src/Fiscal/Model/Origem
Backend/module/Core/src/Core/Model/BaseEntity
Backend/module/Core/src/Core/Hydrator # all folder
Backend/module/Core/src/Core/Model/EntityHydrator
Backend/module/Core/tests/src/CoreTest/Filter/MomentJs
```

#### Needs review to deprecate:

>- Backend/module/Core/src/Core/Report/Filter/Factory
- Backend/module/Core/src/Core/Report/Summary/Factory
- Base class for both: `Backend/module/Core/src/Core/Report/Column/Factory`

## OLD TEST STACK

```
Backend/module/Core/tests/src/CoreTest/Hydrator/DoctrineObjectTest
Backend/module/Core/tests/src/CoreTest/Service/LocalizationTest
Backend/module/Finance/tests/src/FinanceTest/Service/FlowGroupTest
Backend/module/Finance/tests/src/FinanceTest/Service/PaymentTypeTest
Backend/module/Inventory/tests/src/InventoryTest/Service/GroupTest
Backend/module/Inventory/tests/src/InventoryTest/Service/MovimentationTest
Backend/module/Notification/tests/src/NotificationTest/Service/NotificationTest
Backend/module/Person/tests/src/PersonTest/Service/ContactTest
Backend/module/Person/tests/src/PersonTest/Service/CreditLimitTest
Backend/module/Application/tests/src/ApplicationTest/Service/Subscription/CurrentTest
Backend/module/Application/tests/src/ApplicationTest/Service/Subscription/SubscriptionTest
Backend/module/Core/tests/src/CoreTest/Service/I18n/I18nTest
Backend/module/Finance/tests/src/FinanceTest/Service/Flow/BlockTest
Backend/module/Finance/tests/src/FinanceTest/Service/Flow/FormatterTest
Backend/module/Finance/tests/src/FinanceTest/Service/Flow/GetterTest
Backend/module/Finance/tests/src/FinanceTest/Service/Flow/SummaryTest
Backend/module/Finance/tests/src/FinanceTest/Service/Flow/TransactionGetterTest
Backend/module/Finance/tests/src/FinanceTest/Service/Flow/TransferTest
Backend/module/Finance/tests/src/FinanceTest/Service/Goal/NotificationTest
Backend/module/Finance/tests/src/FinanceTest/Service/GoalTest/FilterTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/Client/ValidationTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/Configuracao/DocumentoTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/NFE/GetterTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/NFE/NFEStatusTransmissaoTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/Person/DataPersisterTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/Product/GetterTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/Veiculo/VeiculoTest
Backend/module/Inventory/tests/src/InventoryTest/Service/EletronicInvoice/EntitiesFromXmlTest
Backend/module/Inventory/tests/src/InventoryTest/Service/EletronicInvoice/ImporterTest
Backend/module/Inventory/tests/src/InventoryTest/Service/EletronicInvoice/NormalizerTest
Backend/module/Inventory/tests/src/InventoryTest/Service/EletronicInvoice/ProductMatcherTest
Backend/module/Inventory/tests/src/InventoryTest/Service/Product/ProductFlowTest
Backend/module/Inventory/tests/src/InventoryTest/Service/Trade/DailySummaryTest
Backend/module/Inventory/tests/src/InventoryTest/Service/Trade/MailTest
Backend/module/Person/tests/src/PersonTest/Service/Notification/ContactTest
Backend/module/Person/tests/src/PersonTest/Service/Person/CarrierTest
Backend/module/Person/tests/src/PersonTest/Service/Person/FormatterTest
Backend/module/Finance/tests/src/FinanceTest/Service/Flow/FlowTest/FilterTest
Backend/module/Finance/tests/src/FinanceTest/Service/Flow/Summary/FilterTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/NFE/Builder/NFEBuilderGatewayTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/NFE/Builder/NFEBuilderTest
Backend/module/Fiscal/tests/src/FiscalTest/Service/NFE/Builder/ProdutoBuilderTest
Backend/module/Application/tests/src/ApplicationTest/Service/User/ProfileTest.php
```

## ABSTRACT CLASSES

Abstract classes that need refactoring or need to be excluded

```
Backend/module/Core/src/Core/Report/CollectionReport
Backend/module/Core/src/Core/Report/TableReport
Backend/module/Core/src/Core/Service/AbstractCrud
Backend/module/Core/tests/src/CoreTest/ControllerTestCase
Backend/module/Core/tests/src/CoreTest/Fixture
Backend/module/Core/tests/src/CoreTest/LightTestCase
Backend/module/Core/tests/src/CoreTest/ModelTestCase
Backend/module/Core/tests/src/CoreTest/TestCase
Backend/module/Application/src/Application/Service/Client/AbstractClientRelatedCrud
Backend/module/Finance/src/Finance/Report/Flow/AbstractFlow
Backend/module/Notification/src/Notification/Model/Peer/Peer
Backend/module/Core/src/Core/Service/QueryBuilder/Updater/AbstractStrategy
Backend/module/Core/src/Core/Service/QueryBuilder/Updater/Comparator
Backend/module/Application/src/Application/Service/Notification/Peer/UserCollector/UserCollector
```

## TRAITS

Concrete Traits, not used or out of pattern

```
Backend/module/Skel/tests/Helper/ExampleEntity
Backend/module/Core/src/Core/Report/FilterDisplayTrait
Backend/module/Core/src/Core/Service/EntityCollectionSimpleFormatting
Backend/module/Application/src/Application/Service/Client/ClientAwareTrait
Backend/module/Application/tests/src/ApplicationTest/Helper/Entity
Backend/module/Application/tests/src/ApplicationTest/Helper/Localization
Backend/module/Application/tests/src/ApplicationTest/Helper/Message
Backend/module/Application/tests/src/ApplicationTest/Helper/Subscription
Backend/module/Core/tests/src/CoreTest/Helper/Activity
Backend/module/Core/tests/src/CoreTest/Helper/Bank
Backend/module/Core/tests/src/CoreTest/Helper/Localization
Backend/module/Core/tests/src/CoreTest/Helper/ServicesMock
Backend/module/Core/tests/src/CoreTest/Helper/LayoutMailHelper
Backend/module/Core/tests/src/CoreTest/Helper/Xml
Backend/module/Finance/tests/src/FinanceTest/Helper/Account
Backend/module/Finance/tests/src/FinanceTest/Helper/BankSlip
Backend/module/Finance/tests/src/FinanceTest/Helper/Category
Backend/module/Finance/tests/src/FinanceTest/Helper/Flow
Backend/module/Finance/tests/src/FinanceTest/Helper/Goal
Backend/module/Finance/tests/src/FinanceTest/Helper/Payment
Backend/module/Fiscal/tests/src/FiscalTest/Helper/CupomFiscal
Backend/module/Fiscal/tests/src/FiscalTest/Helper/Fiscal
Backend/module/Fiscal/tests/src/FiscalTest/Helper/NFE
Backend/module/Inventory/tests/src/InventoryTest/Helper/Group
Backend/module/Inventory/tests/src/InventoryTest/Helper/PaymentMode
Backend/module/Inventory/tests/src/InventoryTest/Helper/Product
Backend/module/Inventory/tests/src/InventoryTest/Helper/Tax
Backend/module/Inventory/tests/src/InventoryTest/Helper/Trade
Backend/module/Inventory/tests/src/InventoryTest/Helper/UnitOfMeasure
Backend/module/Person/tests/src/PersonTest/Helper/Person
Backend/module/Reseller/tests/src/ResellerTest/Helper/Lead
```

###### Trais that can become interfaces:

>- Backend/module/Application/src/Application/Service/Auth/AuthenticatedUserAwareTrait

###### Good but needs review (Special cases):

>- Backend/module/Core/src/Core/Service/Cache/CacheConfiguratorAwareTrait
- Backend/module/Core/tests/src/CoreTest/Helper/File
- Backend/module/Core/tests/src/CoreTest/Helper/I18nHelper
- Backend/module/Core/tests/src/CoreTest/Helper/Validation
- Backend/module/Fiscal/tests/src/FiscalTest/Helper/NFeMock
- Backend/module/Fiscal/tests/src/FiscalTest/Helper/Product
- Backend/module/Inventory/src/Inventory/Service/Trade/BuilderTrait
- Backend/module/Core/src/Core/Service/WarningResponseTrait

## INTERAFACES

Critical interfaces that need analyze if will be excluded or refactored

```
Backend/module/Core/src/Core/Model/ClientInterface
Backend/module/Notification/src/Notification/Service/PushNotification/ClientInterface
Backend/module/Core/src/Core/Model/CreditCardInterface
Backend/module/Core/src/Core/I18n/TranslatorAwareInterface
Backend/module/Core/src/Core/Model/PhoneInterface
Backend/module/Core/src/Core/Report/FilterDataAwareInterface
Backend/module/Core/src/Core/Report/ReportInterface
Backend/module/Core/src/Core/Report/StyleAwareInterface
Backend/module/Core/src/Core/Service/EmailAwareInterface
Backend/module/Payment/src/Payment/Model/ClientInformationInterface
Backend/module/Payment/src/Payment/Model/PaymentIdentifierAwareInterface
Backend/module/Payment/src/Payment/Model/SubscriptionInformationInterface
Backend/module/Application/src/Application/Service/Auth/AuthenticatedUserAwareInterface
Backend/module/Application/src/Application/Service/Client/ClientAwareInterface
Backend/module/Core/src/Core/Service/Enum/EnumAwareInterface
Backend/module/Fiscal/src/Fiscal/Model/Xml/SignInfoAwareInterface
Backend/module/Notification/src/Notification/Model/Peer/EntityBasedInterface
Backend/module/Notification/src/Notification/Service/Delivery/DeliveryInterface
Backend/module/Core/src/Core/Service/PaginatorInterface
Backend/module/Application/src/Application/Model/UserInterface
Backend/module/Application/src/Application/Service/Notification/Peer/UserCollector/UserCollectorInterface
Backend/module/Core/src/Core/Service/ReportDataInterface.php
```

###### Interfaces that need to be analyzed

>- Backend/module/Core/src/Core/Service/RemoteFiles/PreProcessor/PreProcessorInterface
- Backend/module/Core/src/Core/AlternativeConfig/ResolverInterface
- Backend/module/Core/src/Core/RdStation/ConnectionInterface
- Backend/module/Core/src/Core/Service/GetDetailedInterface
- Backend/module/Core/src/Core/Service/Cache/CacheConfiguratorAwareInterface
- Backend/module/Core/src/Core/Service/RemoteFiles/UploadInterface
- Backend/module/Fiscal/src/Fiscal/Service/Configuracao/ConfiguracaoGatewayInterface
- Backend/module/Notification/src/Notification/Service/Queue/QueueInterface
- Backend/module/Core/src/Core/Service/WarningAwareInterface

## FACTORIES

Factories out of patter (classes with separated factories)

```
Backend/module/Application/src/Application/Service/DashboardFactory
Backend/module/Core/src/Core/Hydrator/EntityExtractorFactory
Backend/module/Core/src/Core/Hydrator/EntityHydratorFactory
Backend/module/Application/src/Application/Service/User/ProfileFactory
Backend/module/Core/src/Core/Service/Cache/CacheConfiguratorFactory
Backend/module/Core/src/Core/Service/I18n/Factory
Backend/module/Core/src/Core/Service/Metadata/FilterFactory
Backend/module/Fiscal/src/Fiscal/Service/Enum/MotDesICMSFactory
Backend/module/Fiscal/src/Fiscal/Service/Natureza/NaturezaFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/CENQFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/CFOPFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/CSOSNFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/CSTCOFINSFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/CSTFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/CSTIPIFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/CSTPISFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/GetterFactory
Backend/module/Notification/src/Notification/Service/Queue/DatabaseFactory
Backend/module/Person/src/Person/Service/Person/PersonFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/NCMFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/OrigemFactory
Backend/module/Fiscal/src/Fiscal/Service/Product/TipoProdutoFactory
```
