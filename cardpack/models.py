from django.db import models

# Create your models here.
class Pack(models.Model):
    name = models.TextField('Pack', max_length=100, null=True, blank=True)
    pack = models.TextField('Pack', max_length=100, null=True, blank=True)
    description = models.TextField('Pack', max_length=500, null=True, blank=True)
    image = models.CharField('Image', max_length=500, null=True, blank=True)
    q1 = models.CharField('Question1', max_length=500, null=True, blank=True)
    q2 = models.CharField('Question2', max_length=500, null=True, blank=True)
    q3 = models.CharField('Question3', max_length=500, null=True, blank=True)
    class Meta:
        db_table = 'pack'

    def __str__(self):
        return self.name
