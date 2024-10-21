<?php
namespace Drupal\on_submission_handler\Plugin\WebformHandler;

use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Serialization\Yaml;
use Drupal\Core\Url;
use Drupal\Component\Serialization\Json;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\Plugin\WebformExporter;
use Drupal\webform\webformSubmissionInterface;
use Drupal\webform\Controller\WebformResultsExportController;
use Drupal\webform\Form\WebformResultsClearForm;
use Drupal\webform\Form\WebformSubmissionsPurgeForm;
use Drupal\webform\Utility\WebformYaml;
use Drupal\webform\Entity\Webform;
use Drupal\Core\Cache\Cache;
use Psr\Log\LogLevel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Drupal\file\Entity\File;

/**
 * Form submission handler.
 *
 * @WebformHandler(
 *   id = "on_submission_handler",
 *   label = @Translation("ON Webform form handler"),
 *   category = @Translation("Form Handler"),
 *   description = @Translation("Do something extra with form submissions"),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_UNLIMITED,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 * )
 */
class OnSubmissionHandler extends WebformHandlerBase {

     /**
       * {@inheritdoc}
       */

     public function defaultConfiguration() {
        return [
            'submission_folder' => '/home/webchrc/submissions',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
        $form['submission_folder'] = [
            '#type' => 'textfield',
            '#title' => $this->t('Submission Folder Path'),
            '#description' => $this->t('The Folder to save the submission data to.'),
            '#default_value' => $this->configuration['submission_folder'],
            '#required' => TRUE,
        ];
        return $form;
    }

    /**
    * {@inheritdoc}
    */
    public function postSave(WebformSubmissionInterface $webform_submission, $update = TRUE) {
        $fileID = $webform_submission->getElementData('document');
        $file = File::load($fileID);
        
        if($file){
          $filename = $file->getFilename();
          $uri = $file->getFileUri();
          $url = \Drupal::service('file_url_generator')->generateString($uri);

          $webform_submission->setElementData('document', $filename);
          $webform_submission->resave();

          $headers = array(
            'Content-Type'     => 'application/pdf',
            'Content-Disposition' => 'attachment;filename="'.$filename.'"'
          );
      
          // $response = new BinaryFileResponse($url, 200, $headers, true);
          $response = new RedirectResponse($url);
          $response->send();
        }
    }
}
?>
